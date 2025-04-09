import axios from "axios";
import { AuthMethodes } from "../methodes/auth.methodes";

const PORT = "http://localhost:3000";

export class AuthService {
    static async register(email: string, password: string, passwordVerification: string) {
        const validationError = AuthMethodes.validateCredentials(email, password);
        if (validationError) {
            console.error(validationError);
            return null;
        }

        try {
            const response = await axios.post(`${PORT}/auth/register`, {
                email,
                password,
                passwordVerification
            });

            console.log("Retour", response.data);
            return response.data;
        } catch (err: any) {
            console.error("Erreur lors de l'inscription :", err);
            return null;
        }
    }

    static async login(email: string, password: string) {
        const validationError = AuthMethodes.validateCredentials(email, password);
        if (validationError) {
            console.error(validationError);
            return null;
        }

        try {
            const response = await axios.post(`${PORT}/auth/login`, {
                email,
                password,
            }, {withCredentials: true});

            console.log("Retour", response.data);
            return response.data;
        } catch (err: any) {
            console.error("Erreur lors de l'inscription :", err);
            return null;
        }
    }
}