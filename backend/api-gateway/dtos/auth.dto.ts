import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto{
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        { message: 'Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial.' })
      password: string;

    @IsString()
    @MinLength(6)
    passwordVerification: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        { message: 'Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial.' })
      password: string;
}