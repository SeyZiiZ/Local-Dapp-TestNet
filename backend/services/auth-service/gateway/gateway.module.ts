import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'mongo/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "FJSD93KFSDFJ3498DSJKFJSD@*93jsdfjsdf",
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [RegisterController, LoginController],
    providers: [RegisterService, LoginService],
})
export class GatewayModule { }