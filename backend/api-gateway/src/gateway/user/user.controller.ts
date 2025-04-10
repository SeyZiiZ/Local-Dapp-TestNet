import { Body, Controller, Get, Param, Req, Post, Put, Request, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        return req['user'];
    }

    @UseGuards(JwtAuthGuard)
    @Put('addUserWallet')
    async putUserWallet(@Req() req: Request, @Body('wallet') wallet: string) {
        try {
            const userInfos = req['user'];
            const result = await this.userService.addUserWallet(wallet, userInfos);
            return result;
        } catch (error) {
            console.log("Error : ", error);
            throw new InternalServerErrorException("Erreur lors de l'update des données");
        }
    }

    @Get('test')
    async Test() {
        try {
            const result = await this.userService.test();
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Erreur lors de la récupération des données');
        }
    }

}