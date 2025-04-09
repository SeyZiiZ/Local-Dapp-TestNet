import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from 'mongo/mongodb.module';
import { GatewayModule } from 'gateway/gateway.module';

@Module({
  imports: [
    ConfigModule,
    MongoDbModule,
    GatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}