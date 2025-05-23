import { Body, Controller, Get, Put, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateWalletDto } from './dtos/user.dto';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Put("addWallet")
  async updateUserWallet(@Body() updateWalletDto: UpdateWalletDto) {
    const result = await this.appService.updateUserWallet(updateWalletDto.wallet, updateWalletDto.userInfo.sub, updateWalletDto.userInfo.email);
    if (!result.success) {
      throw new Error("Erreur adding wallet")
    }

    return { success: true }
  }

  @Post('aiResponse')
  async getAiReply(@Body('message') message: string) {
    return this.appService.getAiReply(message);
  }

  @Post('newsletter')
  async addEmailNewsletter(@Body('email') email: string) {
    return this.appService.addEmailNewsletter(email);
  }
}