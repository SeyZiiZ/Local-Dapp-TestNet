import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AdminStats } from "dtos/admin.dto";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AdminStatsService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('TRANSACTION_SERVICE') private transactionService: ClientProxy,
    @Inject('WHITELIST_SERVICE') private whitelistService: ClientProxy,
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
      totalWhitelisted: whitelistedRes?.data.numberPendingWhiteList ?? 0,
      totalTransactions: 0,
      whitelistRequests: whitelistRes?.data?.pendingWhitelists ?? [],
    };
  }
}
