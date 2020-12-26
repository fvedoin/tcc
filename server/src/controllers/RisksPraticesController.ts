import { Request, Response } from 'express';

import db from '../database/connection';

export default class RisksPraticesController {
    async getByProject (req: Request, res: Response) {
        const { id } = req.params;

        const data = await db('projects_risks_pratices').select('pratices.name as pratice', 'risks.name as risk', 'projects_risks_pratices.*')
            .join('pratices', 'pratices.id', 'projects_risks_pratices.pratice_id')
            .join('risks', 'risks.id', 'projects_risks_pratices.risk_id')
            .where('project_id', '=', id);

        return res.json(data);
    }

    async update (req: Request, res: Response) {
        const { id } = req.params;

        const updated = await db('projects_risks_pratices').where('id', '=', id)
            .update({'removed_on': new Date()});

        return res.json(updated);
    }
}