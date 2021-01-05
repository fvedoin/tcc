import { Request, Response } from 'express';

import db from '../database/connection';

export default class FinalReportController {

    async create (req: Request, res: Response) {
        const {
            practice_id,
            report_id,
            success_factor
        } = req.body;

        console.log({practice_id: Number(practice_id),
            final_report_id: Number(report_id),
            success_factor})

        if(!practice_id){
            return res.status(400).json({
                error: 'A practice is required.'
            });
        }

        try {
            const insertedIds = await db('success_factor_practice').insert({
                practice_id: Number(practice_id),
                final_report_id: Number(report_id),
                success_factor
            });
        
            return res.status(201).send(insertedIds);
        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while adding practice to success factor'
            });
        }
    }

    async getByFinalReport (req: Request, res: Response) {
        const { reportId, successFactor } = req.params;
        try{
            const practices = await db('success_factor_practice').select('*')
                .join('practices', 'practices.id', 'success_factor_practice.practice_id')
                .where('success_factor_practice.final_report_id', '=', reportId)
                .where('success_factor_practice.success_factor', '=', successFactor);

            return res.json(practices);
        } catch (err) {    
            return res.status(400).json({
                error: err.message
            });
        }
    }
}
