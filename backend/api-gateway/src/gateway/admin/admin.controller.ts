import { Body, Controller, Put, UseGuards, Req } from '@nestjs/common';
import { AdminStatsService } from './admin.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DecisionWhitelist } from 'dtos/admin.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminStatsService) {}

    @UseGuards(JwtAuthGuard)
    @Put('decisionWhitelist')
    async decisionWhitelist(@Body() decisionWhitelist: DecisionWhitelist) {
        try {
            if (!decisionWhitelist.id || !decisionWhitelist.decision) {
                throw new Error("No id or decision provided")
            }

            const result = await this.adminService.decisionWhitelist(decisionWhitelist.id, decisionWhitelist.decision);
            if (!result.success) {
                throw new Error("Update failed");
            }

            return {
                success: true,
            }
        } catch (err: any) {
            console.error('Erreur lors de la connexion :', err);
        }
    }
}