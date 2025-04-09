import { Body, Controller, Get, Param, Req, Res, Post, ConflictException, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from 'dtos/auth.dto';
import { LoginDto } from 'dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('auth')
    getAuth() {
        return this.authService.getAuth();
    }

    @Post('register')
    async createUser(@Body() registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.passwordVerification) {
        throw new BadRequestException('Les mots de passe ne correspondent pas');
    }

      try {
        const result = await this.authService.createUser(registerDto.email, registerDto.password);
        return result
      } catch (err: any) {
        const status = err?.response?.status;
        const data = err?.response?.data;
      
        if (status === 409) {
          console.warn('[⚠️  CONFLICT] Utilisateur déjà existant');
          throw new ConflictException(data?.message || 'Conflit : utilisateur déjà existant.');
        }
      
        console.error('[🔥 ERREUR INATTENDUE]', err?.message);
        throw new InternalServerErrorException('Erreur inattendue lors de la création d\'utilisateur');
      }
    }

    @Post('login')
    async loginUser(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
      try {
        const result = await this.authService.loginUser(loginDto.email, loginDto.password);

        if(!result.success) {
          throw new Error("Utilisateur introuvable");
        }
    
        res.cookie('token', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
          success: true,
          user: result.user,
        };
      } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        throw new UnauthorizedException('Email ou mot de passe invalide');
      }
    }

}