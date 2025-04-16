import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsletterDocument = Newsletter & Document;

@Schema()
export class Newsletter {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true})
    isSubscribedNewsletter: string;

    @Prop({ required: true, default: Date.now() })
    createdAt: Date;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);