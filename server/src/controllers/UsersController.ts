import { Request, Response } from 'express';

import db from '../database/connection';

export default class UsersController {
    async index (req: Request, res: Response) {
        const users = await db('users').select();

        return res.json({ users });
    }

    async create(req: Request, res: Response) {
        const { name, email, profile } = req.body;

        await db('users').insert({
            name, email, profile
        });

        return res.status(201).send();
    }
}