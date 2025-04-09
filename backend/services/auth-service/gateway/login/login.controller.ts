import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from 'dtos/dto';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService
    ) {}

    @Get('getUser')
    getUser() {
        // TO DO : 
    }

    @Post('emailLogin')
    async LoginUserEmail(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.loginService.findUserToLogin(loginDto.email, loginDto.password);
        if (!result.success || !result.data) {
            return { success: false, error: result.error };
          }
          
        const payload = {
            sub: result.data.id,
            email: result.data.email,
            isWhitelist: result.data.isWhitelist,
            isAdmin: result.data.isAdmin
        };
        const token = this.jwtService.sign(payload);

        return {
            success: true,
            user: result.data.id,
            token
        };
    }

    @Post('firebaseLogin')
    LoginUserFirebasse() {

    }
}