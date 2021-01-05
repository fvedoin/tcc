import { Request, Response } from 'express';

import db from '../database/connection';

export default class FinalReportController {

    async create (req: Request, res: Response) {
        const { id } = req.params;
        const {
            scope_specifications,
            process_efficiency,
            goal_achievement,
            project_management_quality,
            stakeholder_satisfaction,
            team_satisfaction,
            customer_satisfaction,
            intention_to_use,
            system_quality,
            information_quality,
            business_impact,
            impact_on_users,
            on_budget,
            on_time
        } = req.body;
        const trx = await db.transaction();
        
        try {
            const insertedIds = await trx('final_reports').insert({
                project_id: id,
                scope_specifications,
                process_efficiency,
                goal_achievement,
                project_management_quality,
                stakeholder_satisfaction,
                team_satisfaction,
                customer_satisfaction,
                intention_to_use,
                system_quality,
                information_quality,
                business_impact,
                impact_on_users,
                on_budget,
                on_time
            });

            const updated = await trx('projects').where('id', '=', id)
                .update({'end_date': new Date()});
        
            await trx.commit();
            
            return res.status(201).send();
        } catch (err) {  
            await trx.rollback();  
            return res.status(400).json({
                error: 'Unexpected error while creating new final report'
            });
        }
    }

    async getByProject (req: Request, res: Response) {
        const { id } = req.params;

        const report = await db('final_reports').select('*')
            .where('project_id', '=', id)
            .first();

        return res.json({ report });
    }
}
