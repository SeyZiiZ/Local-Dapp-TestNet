import axios from "axios";

const PORT = "http://localhost:3000";

export class UserService {
    static async addUserWallet(wallet: string) {
        try {
            const result = await axios.put(`${PORT}/user/addUserWallet`, {
                wallet
            }, {withCredentials: true})
            return result.data;
        } catch (error) {
            console.log("Error", error);
            throw new Error(`Error during the update : ${error}`)
        }
    }

    static async askChatBot(message: string) {
        try {
            const result = await axios.post(`${PORT}/user/chatBot`, {
                message
            }, {withCredentials: true})
            return result.data;
        } catch (error) {
            console.log("Error", error);
            throw new Error(`Error communicating with chatbot : ${error}`)
        }
    }
}