import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminStatsResolver } from './admin.resolver';
import { AdminStatsService } from './admin.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({ secret: "FJSD93KFSDFJ3498DSJKFJSD@*93jsdfjsdf" }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
      {
        name: 'TRANSACTION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
      {
        name: 'WHITELIST_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminStatsResolver, AdminStatsService, JwtAuthGuard],
  exports: []
})
export class AdminStatsModule {}