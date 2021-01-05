import { Request, Response } from 'express';

import db from '../database/connection';

export default class PraticesController {
    async index (req: Request, res: Response) {
        const pratices = await db('pratices').select();

        return res.json({ pratices });
    }

    async getByProject (req: Request, res: Response) {
        const { id } = req.params;

        const pratices = await db('pratices').select('*')
            .join('projects_risks_pratices', 'projects_risks_pratices.pratice_id', 'pratices.id')
            .where('projects_risks_pratices.project_id', '=', id);

        return res.json({ pratices });
    }

    async getByRisk (req: Request, res: Response) {
        const { id } = req.params;

        const pratices = await db('pratices').count('pratices.name', {as: 'occurrence'})
            .select('pratices.name')
            .join('projects_risks_pratices', 'projects_risks_pratices.pratice_id', 'pratices.id')
            .where('projects_risks_pratices.risk_id', '=', id)
            .groupBy('pratices.name')
            .orderByRaw('occurrence desc');

        return res.json({ pratices });
    }
}