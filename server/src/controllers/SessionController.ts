import {Request, Response} from 'express';
import md5 from 'md5';

import {generateToken} from '../auth/auth';
import db from '../database/connection';

class SessionsController {
    async login(req: Request, res: Response) {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await db('users')
                .where('email', String(email))
                .select('*')
                .first();

            if (!user) {
                return res.status(401).json({
                    message: 'E-mail ou senha incorretos.'
                });
            } else {
                if (md5(password) === user.password) {
                    const token = await generateToken({id: user.id, email: user.email});
                    res.status(200).json({token: token, currentUser: {email: user.email, miaw: user.miaw}});
                } else {
                    return res.status(401).json({
                        message: 'E-mail ou senha incorretos.'
                    });
                }
            }
        } catch (e) {
            res.status(500).json({
                message: e.name + ' - Erro ao fazer login.',
            });
        }
    }
}

export default SessionsController;