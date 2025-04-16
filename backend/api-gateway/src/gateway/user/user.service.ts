import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const HOST = process.env.USER_SERVICE_HOST || 'localhost';
const PORT = process.env.USER_SERVICE_PORT || '3002';

@Injectable()
export class UserService {
    constructor(private readonly http: HttpService) {}

    async addUserWallet(wallet: string, userInfo: any) {
        try {
            const response = await firstValueFrom(
                this.http.put(`http://${HOST}:${PORT}/user/addWallet`, {
                    wallet,
                    userInfo
                })
            )
            return response.data;
        } catch (error) {
            console.log("Error : ", error);
            throw new Error("Error : ");
        }
    }

    async getChatResponse(message: string) {
        try {
            const response = await firstValueFrom(
                this.http.post(`http://${HOST}:${PORT}/user/aiResponse`, {
                    message
                })
            )
            console.log("Reponse GATEWAY :", response.data);
            return response.data;
        } catch (error) {
            console.log("Error : ", error);
            throw new Error(`Error : ${error}`);
        }
    }

    async addEmailNewsletter(email: string) {
        try {
            const response = await firstValueFrom(
                this.http.post(`http://${HOST}:${PORT}/user/newsletter`, {
                    email
                })
            )
            console.log(response);
            return response.data;
        } catch (error) {
            console.log("Error : ", error);
            throw new Error(`Error : ${error}`);
        }
    }

    async test(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.http.get(`http://${HOST}:${PORT}/user`)
            );
            return response.data;
        } catch (error) {
            console.error("Erreur dans test() :", error?.message || error);
            throw new Error("Erreur dans la requête HTTP");
        }
    }
}