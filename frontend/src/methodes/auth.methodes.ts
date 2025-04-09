export class AuthMethodes {
    static checkEmail(email: string): boolean {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    }

    static checkPassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        return regex.test(password);
    }

    static validateCredentials(email: string, password: string) {
        if(!this.checkEmail(email)) {
            return "Erreur lors de la validation de l'adresse mail."
        } else if (!this.checkPassword(password)) {
            return "Erreur le mot de passe ne respecte pas les regles."
        }
        return;
    }
}  