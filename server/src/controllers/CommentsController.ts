import { Request, Response } from 'express';
import {decodeToken} from '../auth/auth';

import db from '../database/connection';

export default class CommentsController {
    async getByRelation (req: Request, res: Response) {
        const { id } = req.params;

        const data = await db('comments').select('comments.*', 'users.name')
            .join('users', 'users.id', 'comments.user_id')
            .where('project_risk_pratice_id', '=', id);

        return res.json(data);
    }

    async create (req: Request, res: Response) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const currentUser: any = await decodeToken(String(token));

    
        const {comment, project_risk_pratice_id} = req.body;

        const commentData = {
            comment,
            project_risk_pratice_id,
            user_id: currentUser.id 
        }          

        await db('comments').insert(commentData);

        return res.json(commentData);
    }
}