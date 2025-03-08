import { Request, Response } from 'express';
declare const register: (req: Request, res: Response) => Promise<void>;
declare const login: (req: Request, res: Response) => Promise<void>;
declare const getPortfolio: (req: Request, res: Response) => Promise<void>;
declare const buyStock: (req: Request, res: Response) => Promise<void>;
declare const sellStock: (req: Request, res: Response) => Promise<void>;
export { register, login, getPortfolio, buyStock, sellStock };
