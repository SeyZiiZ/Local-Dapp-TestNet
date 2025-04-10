import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const PORT = process.env.USER_SERVICE_PORT || 3002;

@Injectable()
export class UserService {
    constructor(private readonly http: HttpService) {}

    async addUserWallet(wallet: string, userInfo: any) {
        try {
            const response = await firstValueFrom(
                this.http.put(`http://localhost:${PORT}/user/addWallet`, {
                    wallet,
                    userInfo
                })
            )
        } catch (error) {
            console.log("Error : ", error);
            throw new Error("Error : ");
        }
    }

    async test(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.http.get(`http://localhost:${PORT}/user`)
            );
            return response.data;
        } catch (error) {
            console.error("Erreur dans test() :", error?.message || error);
            throw new Error("Erreur dans la requête HTTP");
        }
    }
}