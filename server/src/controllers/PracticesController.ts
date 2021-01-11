import { Request, Response } from 'express';

import db from '../database/connection';

export default class PracticesController {
    async index (req: Request, res: Response) {
        const practices = await db('practices').select();

        return res.json({ practices });
    }

    async getByProject (req: Request, res: Response) {
        const { id } = req.params;

        const practices = await db('practices').select('*')
            .join('projects_risks_practices', 'projects_risks_practices.practice_id', 'practices.id')
            .where('projects_risks_practices.project_id', '=', id);

        return res.json({ practices });
    }

    async getByRisk (req: Request, res: Response) {
        const { id } = req.params;

        const practices = await db('practices').count('practices.name', {as: 'occurrence'})
            .select('practices.name')
            .join('projects_risks_practices', 'projects_risks_practices.practice_id', 'practices.id')
            .where('projects_risks_practices.risk_id', '=', id)
            .groupBy('practices.name')
            .orderByRaw('occurrence desc');

        return res.json({ practices });
    }

    async getByRiskAndProject (req: Request, res: Response) {
        const { riskId, projectDuration, projectType } = req.query;
        
        const practices = await db('practices').count('practices.name', {as: 'occurrence'})
            .select('practices.name')
            .join('projects_risks_practices', 'projects_risks_practices.practice_id', 'practices.id')
            .join('projects', 'projects.id', 'projects_risks_practices.project_id')
            .where('projects_risks_practices.risk_id', '=', Number(riskId))
            .where('projects.duration', '=', String(projectDuration))
            .where('projects.type', '=', String(projectType))
            .groupBy('practices.name')
            .orderByRaw('occurrence desc');

        return res.json({ practices });
    }
}