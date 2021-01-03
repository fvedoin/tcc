import { Request, Response } from 'express';

import db from '../database/connection';

export default class FinalReportController {

    async create (req: Request, res: Response) {
        const {
            pratice_id,
            report_id,
            success_factor
        } = req.body;

        try {
            const insertedIds = await db('success_factor_pratice').insert({
                pratice_id: Number(pratice_id),
                final_report_id: Number(report_id),
                success_factor
            });
        
            return res.status(201).send(insertedIds);
        } catch (err) {    
            console.log(err);
            return res.status(400).json({
                error: 'Unexpected error while adding pratice to success factor'
            });
        }
    }

    async getByFinalReport (req: Request, res: Response) {
        const { reportId, successFactor } = req.params;
        try{
            const pratices = await db('success_factor_pratice').select('*')
                .join('pratices', 'pratices.id', 'success_factor_pratice.pratice_id')
                .where('success_factor_pratice.final_report_id', '=', reportId)
                .where('success_factor_pratice.success_factor', '=', successFactor);

            return res.json(pratices);
        } catch (err) {    
            return res.status(400).json({
                error: err.message
            });
        }
    }
}
