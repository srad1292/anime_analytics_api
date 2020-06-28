import { Request, Response } from 'express';

export function requestLoggerMiddleware(request: Request, response: Response, next: any) {
    if(request.method === 'OPTIONS') {
        next();
        return;
    }

    const requestLog = `${request.method} ${request.path}`;
    console.log(requestLog);
    next();
}