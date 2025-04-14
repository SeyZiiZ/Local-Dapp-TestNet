import { Body, Controller, Get, Put } from '@nestjs/common';
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
}