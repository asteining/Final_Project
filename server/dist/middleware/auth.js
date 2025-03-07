import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            // Attach the decoded user info to the request object
            req.user = decoded;
            return next();
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    return res.status(401).json({ message: 'No token provided' });
};
export { authMiddleware };
