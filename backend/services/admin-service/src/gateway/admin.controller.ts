import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    return "salut";
  }

  @EventPattern('count-users')
  async countUsers() {
    return await this.adminService.getTotalUsers();
  }

  @EventPattern('count-whitelisted')
  async countWhitelisted() {
    return await this.adminService.getTotalWhitelistedUsers();
  }

  @EventPattern('get-pending-whitelists')
  async getPendingWhitelists() {
    return await this.adminService.getPendingWhitelists();
  }
}
