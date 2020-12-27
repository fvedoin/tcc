import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../auth/auth';

const userInterceptor = async function (req: Request, res: Response, next: NextFunction) {
    if (req.url.includes("/projects") || req.url.includes("/relation") || req.url.includes("/comments")) {
        //Get the token from request header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        //Verify if the request has a token
        if (!token) {
            return res.status(401).json({
                message: 'Restrict Access'
            });
        } else {
            try {
                decodeToken(token);
                next();
            } catch (e) {
                return res.status(403).json({
                    message: 'Invalidated Token'
                });
            }
        };
    } else {
        if (req.url.includes("/login") || req.url.includes("/uploads") || (req.url.includes("/users") && req.method === 'POST')) {
            next();
        } else {
            res.status(404).json({
                message: 'Page Not Found'
            });
        }
    }
};

export default userInterceptor;