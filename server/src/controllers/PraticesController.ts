import { Request, Response } from 'express';

import db from '../database/connection';

export default class PraticesController {
    async index (req: Request, res: Response) {
        const pratices = await db('pratices').select();

        return res.json({ pratices });
    }
}