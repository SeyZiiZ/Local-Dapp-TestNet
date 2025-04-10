export class StandardFunctionReturn {
    success: boolean;
    data?: {
        numberUsers?: number;
        numberPendingWhiteList?: number;
        pendingWhitelists?: any;
    }
    error?: string;
}