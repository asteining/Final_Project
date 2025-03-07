import { Router } from 'express';
import tradeRoutes from './tradeRoutes.js';
const router = Router();

router.use('/trade', tradeRoutes);

export default router;
