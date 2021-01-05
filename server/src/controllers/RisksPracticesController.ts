import { Request, Response } from 'express';

import db from '../database/connection';

export default class RisksPracticesController {
    async getByProject (req: Request, res: Response) {
        const { id } = req.params;

        const data = await db('projects_risks_practices').select('practices.name as practice', 'risks.name as risk', 'projects_risks_practices.*')
            .join('practices', 'practices.id', 'projects_risks_practices.practice_id')
            .join('risks', 'risks.id', 'projects_risks_practices.risk_id')
            .where('project_id', '=', id);

        return res.json(data);
    }

    async remove (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const updated = await db('projects_risks_practices').where('id', '=', id)
                .update({'removed_on': db.fn.now()});

            return res.json(updated);
        }  catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while removing practice from project'
            });
        }
    }

    async add (req: Request, res: Response) {
        try {
            const { id } = req.params;

            const {risk_id, practice_id} = req.body;

            const risk_practice = {
                risk_id,
                practice_id,
                project_id: id 
            }          

            if(risk_id === '' || practice_id === '' || id === ''){
                return res.status(400).json({
                    error: 'Unexpected error while adding practice from project'
                });
            }

            await db('projects_risks_practices').insert(risk_practice);

            return res.json(risk_practice);
        }  catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while adding practice from project'
            });
        }
    }
}