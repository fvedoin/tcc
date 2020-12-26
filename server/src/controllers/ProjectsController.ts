import { Request, Response } from 'express';

import {decodeToken} from '../auth/auth';
import db from '../database/connection';

interface RiskPratice {
    risk_id: number,
    pratice_id: number
}

interface ProjectUser {
    user_id: number,
    project_id: number
}

export default class ProjectsController {
    async index (req: Request, res: Response) {
        const projects = await db('projects').select();
        
        return res.json(projects);
    }

    async create (req: Request, res: Response) {
        const {
            name,
            start_date,
            type,
            duration,
            risksPratices,
            users
        } = req.body;

        const trx = await db.transaction();

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const currentUser: any = await decodeToken(String(token));

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
        
            let project_users: ProjectUser[] = [];

            for await (let email of users) {
                var user = await trx('users').select('id').where('email', '=', email.trim()).first();
                console.log(user.id);
                project_users.push({user_id: user.id, project_id});
            };

            project_users.push({
                project_id,
                user_id: currentUser.id
            });

            await trx('projects_users').insert(project_users);
        
            await trx.commit();
        
            return res.status(201).send();
        } catch (err) {
            await trx.rollback();
            console.log(err);
            return res.status(400).json({
                error: 'Unexpected error while creating new project'
            });
        }
    }

    async update() {
        
    }
}
