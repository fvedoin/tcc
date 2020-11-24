import { Request, Response } from 'express';

import db from '../database/connection';

interface RiskPratice {
    risk_id: number,
    pratice_id: number
}

export default class ProjectsController {
    async index (req: Request, res: Response) {
        const projects = [{}];
        return res.json(projects);
    }

    async create (req: Request, res: Response) {
        const {
            name,
            start_date,
            type,
            duration,
            risksPratices,
        } = req.body;

        const trx = await db.transaction();
    
        try {
            const insertedProjectsIds = await trx('projects').insert({
                name,
                start_date,
                type,
                duration
            });
        
            const project_id = insertedProjectsIds[0];
               
            const risks_pratices = risksPratices.map((item: RiskPratice) => {
                return {
                    risk_id: item.risk_id,
                    pratice_id: item.pratice_id,
                    project_id                    
                };
            });
        
            await trx('projects_risks_pratices').insert(risks_pratices);
        
            await trx.commit();
        
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
    
            return res.status(400).json({
                error: 'Unexpected error while creating new project'
            });
        }
    }

    async update() {
        
    }
}
