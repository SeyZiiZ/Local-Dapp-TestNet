import { Body, Controller, Get, Param, Req, Post, Put, Request, UseGuards, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChatBotDto, EmailNewsletterDto } from 'dtos/user.dto';

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

    @UseGuards(JwtAuthGuard)
    @Post('chatBot')
    async getChatBot(@Body() chatBotDto: ChatBotDto) {
        try {
            const result = await this.userService.getChatResponse(chatBotDto.message);
            if (!result.success) {
                return new Error("Erreur côté IA")
            }
            return {
                success: true,
                response: result.data.response,
              };
        } catch (error: any) {
            console.log("Error : ", error);
            throw new InternalServerErrorException("Error getting response");
        }
    }

    @Post('newsletter')
    async addEmailNewsletter(@Body() emailNewsletterDto: EmailNewsletterDto) {
        try {
            const result = await this.userService.addEmailNewsletter(emailNewsletterDto.email);
            if (!result.success) {
                throw new BadRequestException(result.error || "Error adding email to newsletter");
            }
            return {success: true}
        } catch (error) {
            console.log("Error : ", error);
            throw new InternalServerErrorException("Error adding email newsletter");
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