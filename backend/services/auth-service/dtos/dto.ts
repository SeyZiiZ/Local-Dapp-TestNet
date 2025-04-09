import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        { message: 'Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial.' })
    password: string;

    jwt?: string;
}

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        { message: 'Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial.' })
    password: string;
}

export class StandardFunctionReturn {
    success: boolean;
    data?: {
        id: string | any;
        email: string;
        isWhitelist: boolean;
        isAdmin: boolean;
    }
    error?: string;
}