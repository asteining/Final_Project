import { Request, Response, NextFunction } from 'express';
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void | Response;
export { authMiddleware };
