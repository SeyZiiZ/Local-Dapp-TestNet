import { IsString, IsEmail } from "class-validator";

export class ChatBotDto {
    @IsString()
    message: string;
}

export class EmailNewsletterDto {
    @IsString()
    @IsEmail()
    email: string;
}