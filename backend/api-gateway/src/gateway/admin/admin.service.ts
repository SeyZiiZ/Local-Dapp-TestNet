import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AdminStats } from "dtos/admin.dto";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from "rxjs";

const HOST = process.env.ADMIN_SERVICE_HOST || 'localhost';
const PORT = process.env.ADMIN_SERVICE_PORT || '3003';

@Injectable()
export class AdminStatsService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('TRANSACTION_SERVICE') private transactionService: ClientProxy,
    @Inject('WHITELIST_SERVICE') private whitelistService: ClientProxy,
    private readonly http: HttpService
  ) {}

  async getStats(): Promise<AdminStats> {
    const [userRes, whitelistedRes, whitelistRes] = await Promise.all([
      firstValueFrom(this.userService.send('count-users', {})),
      firstValueFrom(this.whitelistService.send('count-whitelisted', {})),
      //firstValueFrom(this.transactionService.send('count-transactions', {})),
      firstValueFrom(this.whitelistService.send('get-pending-whitelists', {})),
    ]);
    
    return {
      totalUsers: userRes?.data?.numberUsers ?? 0,
      totalWhitelisted: whitelistedRes?.data?.numberPendingWhiteList ?? 0,
      totalTransactions: 0,
      whitelistRequests: whitelistRes?.data?.pendingWhitelists ?? [],
    };
  }

  async decisionWhitelist(id: string, decision: string) {
    try {
      const response = await firstValueFrom(
        this.http.put(`http://${HOST}:${PORT}/decisionWhitelist`, {
          id,
          decision
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error updating whitelist :', error.message);
      throw error;
    }
  }
}
