import { Request, Response } from 'express';

import db from '../database/connection';

export default class RisksController {
    async index (req: Request, res: Response) {
        const risks = await db('risks').select();

        return res.json({ risks });
    }
}