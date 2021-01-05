import { Request, Response } from 'express';

import {decodeToken} from '../auth/auth';
import db from '../database/connection';

interface RiskPractice {
    risk_id: number,
    practice_id: number
}

interface ProjectUser {
    user_id: number,
    project_id: number
}

export default class ProjectsController {
    async index (req: Request, res: Response) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const currentUser: any = await decodeToken(String(token));

        const projects = await db('projects').select('*')
            .join('projects_users', 'projects_users.project_id', 'projects.id')
            .where('projects_users.user_id', '=', currentUser.id)
        
        return res.json(projects);
    }

    async create (req: Request, res: Response) {
        const {
            name,
            start_date,
            type,
            duration,
            risksPractices,
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
               
            const risks_practices = risksPractices.map((item: RiskPractice) => {
                return {
                    risk_id: item.risk_id,
                    practice_id: item.practice_id,
                    project_id                    
                };
            });

            await trx('projects_risks_practices').insert(risks_practices);
        
            let project_users: ProjectUser[] = [];

            for await (let email of users) {
                var user = await trx('users').select('id').where('email', '=', email.trim()).first();
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
            return res.status(400).json({
                error: 'Unexpected error while creating new project'
            });
        }
    }

}
