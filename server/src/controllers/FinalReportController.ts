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
    
        try {
            const insertedIds = await db('final_reports').insert({
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
        
            return res.status(201).send();
        } catch (err) {    
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
