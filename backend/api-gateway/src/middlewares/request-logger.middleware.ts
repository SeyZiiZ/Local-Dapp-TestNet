import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;

    console.log(`[Middleware] Nouvelle requête : IP = ${ip}`);

    next();
  }
}