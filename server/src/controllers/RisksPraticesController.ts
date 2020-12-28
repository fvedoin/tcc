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

    async remove (req: Request, res: Response) {
        const { id } = req.params;

        try {
            const updated = await db('projects_risks_pratices').where('id', '=', id)
                .update({'removed_on': new Date()});

            return res.json(updated);
        }  catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while removing pratice from project'
            });
        }
    }

    async add (req: Request, res: Response) {
        try {
            const { id } = req.params;

            const {risk_id, pratice_id} = req.body;

            const risk_pratice = {
                risk_id,
                pratice_id,
                project_id: id 
            }          

            if(risk_id === '' || pratice_id === '' || id === ''){
                return res.status(400).json({
                    error: 'Unexpected error while adding pratice from project'
                });
            }

            await db('projects_risks_pratices').insert(risk_pratice);

            return res.json(risk_pratice);
        }  catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while adding pratice from project'
            });
        }
    }
}