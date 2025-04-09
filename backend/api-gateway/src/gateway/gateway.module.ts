import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({ secret: "FJSD93KFSDFJ3498DSJKFJSD@*93jsdfjsdf" })
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class GatewayModule {}