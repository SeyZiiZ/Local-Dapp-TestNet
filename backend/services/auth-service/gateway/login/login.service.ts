import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'mongo/models/user.model';
import { StandardFunctionReturn } from 'dtos/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async findUserToLogin(email: string, password: string): Promise<StandardFunctionReturn> {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) {
                return { success: false, error: 'Utilisateur non trouvé' };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false, error: 'Mot de passe incorrect' };
            }

            return {
                success: true,
                data: {
                    id: user._id,
                    email: user.email,
                    isWhitelist: user.isWhitelisted,
                    isAdmin: user.isAdmin
                },
            };
        } catch (err) {
            console.error("Erreur lors de la recherche de l'utilisateur :", err);
            return {
                success: false,
                error: 'Erreur interne lors de la connexion',
            };
        }
    }
}