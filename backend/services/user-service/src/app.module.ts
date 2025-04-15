import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from './mongo/mongodb.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './mongo/models/user.model';
import { PendingWhitelist, PendingWhitelistSchema } from './mongo/models/pendingWhitelist.model';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule,
    MongoDbModule,
    HttpModule,
    OpenaiModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PendingWhitelist.name, schema: PendingWhitelistSchema }
    ]),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
