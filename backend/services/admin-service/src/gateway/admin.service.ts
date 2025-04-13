import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { ChangeStreamDocument, ChangeStreamInsertDocument } from 'mongodb';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/mongo/models/user.model';
import { PendingWhitelist, PendingWhitelistDocument } from 'src/mongo/models/pendingWhitelist.model';
import { StandardFunctionReturn } from 'dtos/returnFunction.dto';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject('REDIS_CLIENT') private readonly client: ClientProxy,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PendingWhitelist.name) private pendingWhitelistModel: Model<PendingWhitelistDocument>,
  ) {}
  
  async onModuleInit() {
    const collection = this.connection.collection('pendingwhitelists');
    const changeStream = collection.watch([], {
      fullDocument: 'updateLookup'
    });

    changeStream.on('change', (change: ChangeStreamDocument) => {
      console.log('🔄 Changes detected : ', change);

      if ('fullDocument' in change) {
        this.client.emit('new-notification', {
          title: 'Nouveau Wallet',
          details: change.fullDocument,
        });
      }
    });
  }

  async getTotalUsers(): Promise<StandardFunctionReturn> {
    try {
      const countUser = await this.userModel.countDocuments();
      if (!countUser) {
        return { success: false }
      }
      return { success: true, data: { numberUsers: countUser } }
    } catch (error) {
      throw new Error("Error counting users")
    }
  }

  async getTotalWhitelistedUsers(): Promise<StandardFunctionReturn> {
    try {
      const countPendingWhitelist = await this.pendingWhitelistModel.countDocuments({status: true});
      if (!countPendingWhitelist) {
        return { success: false }
      }
      return { success: true, data: { numberPendingWhiteList: countPendingWhitelist } }
    } catch (error) {
      throw new Error("Error counting pending whitelist")
    }
  }

  async getPendingWhitelists(): Promise<StandardFunctionReturn> {
    try {
      const rawPendingWhitelists = await this.pendingWhitelistModel.find().exec();
  
      if (!rawPendingWhitelists) {
        return { success: false };
      }
  
      const mapped = rawPendingWhitelists.map((entry) => ({
        id: entry._id,
        wallet: entry.wallet,
        status: entry.status,
        createdAt: entry.createdAt,
        userId: entry.userId,
      }));
  
      return { success: true, data: { pendingWhitelists: mapped } };
    } catch (error) {
      console.error('❌ Erreur dans getPendingWhitelists:', error);
      return { success: false, error: 'Mongo query failed' };
    }
  }

  async decisionWhitelist(id: string, decision: string): Promise<StandardFunctionReturn> {
    try {
      const isApproved = decision === 'accepted';
  
      const whitelistEntry = await this.pendingWhitelistModel.findById(id).exec();
  
      if (!whitelistEntry) {
        return {
          success: false,
          error: `No Whitelist found with id: ${id}`
        };
      }
      const userId = whitelistEntry.userId;

      const whitelistResult = await this.pendingWhitelistModel.updateOne(
        { _id: id },
        { $set: { status: isApproved } }
      );
  
      const userResult = await this.userModel.updateOne(
        { _id: userId },
        { $set: { isWhitelisted: isApproved } }
      );
  
      if (whitelistResult.modifiedCount === 0 && userResult.modifiedCount === 0) {
        return {
          success: false,
          error: 'No update made'
        };
      }
  
      return { success: true };
  
    } catch (error) {
      console.error('❌ Erreur dans decisionWhitelist :', error);
      return {
        success: false,
        error: 'MongoDB query failed.'
      };
    }
  }
  

}