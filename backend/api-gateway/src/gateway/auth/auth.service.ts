import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const PORT = process.env.USER_SERVICE_PORT || 3001;

@Injectable()
export class AuthService {
    constructor(private readonly http: HttpService) { }

    async getAuth() {
        return "Utilisateur connecter !"
    }

    async createUser(email: string, password: string) {
        try {
            const response = await firstValueFrom(
                this.http.post(`http://localhost:${PORT}/register/user`, {
                    email,
                    password,
                }),
            );

            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création utilisateur :', error.message);
            throw error;
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const response = await firstValueFrom(
                this.http.post(`http://localhost:${PORT}/login/emailLogin`, {
                    email,
                    password
                }),
            );
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur :", error.message);
            throw error;
        }
    }
}