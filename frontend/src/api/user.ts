import axios from "axios";

const PORT = "http://localhost:3000";

export class UserService {
    static async testMe() {
        try {
            const result = await axios.get(`${PORT}/user/me`, {
                withCredentials: true
            });
            console.log("API : ", result.data);
            return result.data;
        } catch (error: any) {
            console.log("Erreur", error);
        }
    }
}