import { IsString, IsNotEmpty } from "class-validator";

export class UpdateWalletDto {
    @IsString()
    @IsNotEmpty()
    wallet: string;

    userInfo: {
        sub: string;
        email: string;
        iat?: number;
        exp?: number;
    };
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

export class StandardFunctionReturnAI {
    success: boolean;
    data?: {
        response: string;
    }
}