import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'mongo/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async createUser(email: string, password: string): Promise<Object> {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Un utilisateur avec cet email existe déjà.');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = new this.userModel({
                email,
                password: hashedPassword,
                createdAt: new Date(),
            });

            const savedUser = await createdUser.save();

            return {
                success: true,
                email: savedUser.email
            };
        } catch (err: any) {
            console.error("Erreur lors de la création de l'utilisateur :", err);
            throw new InternalServerErrorException("Erreur interne lors de la création de l'utilisateur.");
        }
    }
}