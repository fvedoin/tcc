import { Request, Response } from 'express';

import db from '../database/connection';

export default class ClassesController {
    async index (req: Request, res: Response) {
      
        return res.json({});
    }

}