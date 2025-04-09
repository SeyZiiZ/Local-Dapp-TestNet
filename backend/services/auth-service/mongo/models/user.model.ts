import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: '' })
  userWallet: string;

  @Prop({ required: true, default: false})
  isWhitelisted: boolean;

  @Prop({ required: true, default: false })
  newsletterSubscribed: boolean;

  @Prop({ required: true, default: false})
  isAdmin: boolean;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);