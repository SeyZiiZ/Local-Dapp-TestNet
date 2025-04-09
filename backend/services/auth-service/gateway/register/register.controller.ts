import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from 'dtos/dto';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post('user')
    async createUser(@Body() registerDto: RegisterDto) {
        return await this.registerService.createUser(registerDto.email, registerDto.password);
    }
}