import type { Request, Response } from 'express';
export declare const getInitialGameState: (_req: Request, res: Response) => Promise<void>;
export declare const addGuess: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
