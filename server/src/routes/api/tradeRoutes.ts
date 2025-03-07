import { Router } from 'express';
import { register, login, getPortfolio, buyStock, sellStock } from '../../controllers/trade-controller.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/portfolio', authMiddleware, getPortfolio);
router.post('/buy', authMiddleware, buyStock);
router.post('/sell', authMiddleware, sellStock);

export default router;
