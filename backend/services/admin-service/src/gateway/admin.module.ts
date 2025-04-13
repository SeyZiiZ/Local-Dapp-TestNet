import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongoDbModule } from 'src/mongo/mongodb.module';
import { User, UserSchema } from 'src/mongo/models/user.model';
import { PendingWhitelist, PendingWhitelistSchema } from 'src/mongo/models/pendingWhitelist.model';

@Module({
    imports: [
        ConfigModule,
        MongoDbModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: PendingWhitelist.name, schema: PendingWhitelistSchema }
          ]),
        ClientsModule.register([
            {
                name: 'REDIS_CLIENT',
                transport: Transport.REDIS,
                options: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                },
            },
        ]),
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class GatewayModule {}