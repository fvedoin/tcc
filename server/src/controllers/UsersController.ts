import { Request, Response } from 'express';
import md5 from 'md5';

import db from '../database/connection';

export default class UsersController {
    async create(req: Request, res: Response) {
        const { name, email, password, profile } = req.body;

        var hash = md5(password);

        await db('users').insert({
            name, email, password: hash, profile
        });

        return res.status(201).send();
    }
}