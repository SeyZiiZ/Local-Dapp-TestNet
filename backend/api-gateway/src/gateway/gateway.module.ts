import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NotificationsGateway } from './websocket/notifications.gateway';
import { NotificationsController } from './websocket/notifications.controller';
import { AdminStatsModule } from './admin/admin-stats.module';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({ secret: "FJSD93KFSDFJ3498DSJKFJSD@*93jsdfjsdf" }),
    AdminStatsModule
  ],
  controllers: [AuthController, UserController, NotificationsController],
  providers: [AuthService, UserService, JwtAuthGuard, NotificationsGateway],
  exports: [JwtAuthGuard]
})
export class GatewayModule {}