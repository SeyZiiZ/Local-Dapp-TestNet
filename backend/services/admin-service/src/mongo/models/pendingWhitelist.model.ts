import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PendingWhitelistDocument = PendingWhitelist & Document;

@Schema()
export class PendingWhitelist {
    @Prop({ required: true })
    userId: string;
    
    @Prop({ required: true, unique: true })
    wallet: string;

    @Prop({ required: true, default: Date.now() })
    createdAt: Date;

    @Prop({ required: true })
    status: string;
}

export const PendingWhitelistSchema = SchemaFactory.createForClass(PendingWhitelist);