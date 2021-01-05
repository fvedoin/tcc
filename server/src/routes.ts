import express from 'express';

import CommentsController from './controllers/CommentsController';
import FinalReportController from './controllers/FinalReportController';
import PracticesController from './controllers/PracticesController';
import ProjectsController from './controllers/ProjectsController';
import RisksController from './controllers/RisksController';
import RisksPracticesController from './controllers/RisksPracticesController';
import SessionsController from './controllers/SessionController';
import SuccessFactorPractice from './controllers/SuccessFactorPracticeController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const commentsController = new CommentsController();
const usersController = new UsersController();
const projectsController = new ProjectsController();
const finalReportController = new FinalReportController();
const practicesController = new PracticesController();
const sessionController = new SessionsController();
const risksController = new RisksController();
const risksPracticesController = new RisksPracticesController();
const successFactorPractice = new SuccessFactorPractice();

//Create users
routes.post('/users', usersController.create);

//Create session
routes.post('/login', sessionController.login);

//Routes for projects
routes.post('/projects', projectsController.create);
routes.get('/projects', projectsController.index);

//Search project by id
routes.get('/projects/:id/practices', practicesController.getByProject);
routes.get('/projects/:id/users', usersController.getByProject);

routes.get('/projects/:id/relation', risksPracticesController.getByProject);
routes.post('/projects/:id/relation', risksPracticesController.add);

//Finish project
routes.post('/projects/:id/finish', finalReportController.create);

//Get report
routes.get('/projects/:id/report', finalReportController.getByProject);

//Search practices in the project
routes.put('/relation/:id/remove', risksPracticesController.remove);

//Search comments in the relation
routes.get('/relation/:id/comments', commentsController.getByRelation);

routes.post('/final-report/practices', successFactorPractice.create);
routes.get('/final-report/:reportId/practices/:successFactor', successFactorPractice.getByFinalReport);

//Create comment
routes.post('/comments', commentsController.create);

//Select all practices
routes.get('/practices', practicesController.index);

routes.get('/risks/:id/practices', practicesController.getByRisk);

//Select all risks
routes.get('/risks', risksController.index);

export default routes;