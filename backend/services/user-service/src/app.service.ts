import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './mongo/models/user.model';
import { PendingWhitelist, PendingWhitelistDocument } from './mongo/models/pendingWhitelist.model';
import { StandardFunctionReturn, StandardFunctionReturnAI } from './dtos/user.dto';
import { OpenaiService } from './openai/openai.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PendingWhitelist.name) private whitelistModel: Model<PendingWhitelistDocument>,
    private readonly openaiService: OpenaiService
  ) {}

  async updateUserWallet(wallet: string, id: string, email: string): Promise<StandardFunctionReturn> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id, email },
        { userWallet: wallet },
        { new: true }
      );
  
      if (!updatedUser) {
        return {
          success: false,
          error: 'Utilisateur non trouvé'
        };
      }

      await this.whitelistModel.create({
        userId: id,
        wallet,
        createdAt: new Date(),
      });

      return { success: true };
    } catch (error: any) {
      console.error("Erreur dans updateUserWallet:", error);
      return {
        success: false,
        error: 'Erreur interne lors de la mise à jour du wallet'
      };
    }
  }

  async getAiReply(msg: string): Promise<StandardFunctionReturnAI> {
    try {
      const response = await this.openaiService.ask(msg);
      if(!response) {
        return {success: false}
      }
      return {success: true, data: {response: response}}
    } catch (error: any) {
      console.log("Error", error);
      throw new Error(`Error communicating with openai api: ${error}`);
    }
  }
}
