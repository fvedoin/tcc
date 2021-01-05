import { Request, Response } from 'express';
import md5 from 'md5';

import db from '../database/connection';

export default class UsersController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password, profile } = req.body;

            var hash = md5(password);

            await db('users').insert({
                name, email, password: hash, profile
            });

            return res.status(201).send();
        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while creating new user'
            });
        }
    }

    async getByProject (req: Request, res: Response) {
        const { id } = req.params;

        const users = await db('users').select('*')
            .join('projects_users', 'projects_users.user_id', 'users.id')
            .where('projects_users.project_id', '=', id);

        return res.json({ users });
    }
}