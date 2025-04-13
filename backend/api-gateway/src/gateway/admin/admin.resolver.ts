import { Resolver, Query } from '@nestjs/graphql';
import { AdminStatsService } from './admin.service';
import { AdminStats } from 'dtos/admin.dto';

@Resolver(() => AdminStats)
export class AdminStatsResolver {
    constructor(private readonly statsService: AdminStatsService) { }

    @Query(() => AdminStats)
    async getAdminStats(): Promise<AdminStats> {
        return await this.statsService.getStats();
    }
}