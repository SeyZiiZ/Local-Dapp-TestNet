import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/admin.module';

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
