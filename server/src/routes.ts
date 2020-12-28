import express from 'express';

import CommentsController from './controllers/CommentsController';
import FinalReportController from './controllers/FinalReportController';
import PraticesController from './controllers/PraticesController';
import ProjectsController from './controllers/ProjectsController';
import RisksController from './controllers/RisksController';
import RisksPraticesController from './controllers/RisksPraticesController';
import SessionsController from './controllers/SessionController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const commentsController = new CommentsController();
const usersController = new UsersController();
const projectsController = new ProjectsController();
const finalReportController = new FinalReportController();
const praticesController = new PraticesController();
const sessionController = new SessionsController();
const risksController = new RisksController();
const risksPraticesController = new RisksPraticesController();

//Create users
routes.post('/users', usersController.create);

//Create session
routes.post('/login', sessionController.login);

//Routes for projects
routes.post('/projects', projectsController.create);
routes.get('/projects', projectsController.index);

//Search project by id
routes.get('/projects/:id/pratices', praticesController.getByProject);

routes.get('/projects/:id/relation', risksPraticesController.getByProject);
routes.post('/projects/:id/relation', risksPraticesController.add);

//Finish project
routes.post('/projects/:id/finish', finalReportController.create);

//Search pratices in the project
routes.put('/relation/:id/remove', risksPraticesController.remove);

//Search comments in the relation
routes.get('/relation/:id/comments', commentsController.getByRelation);

//Create comment
routes.post('/comments', commentsController.create);

//Select all pratices
routes.get('/pratices', praticesController.index);

//Select all risks
routes.get('/risks', risksController.index);

export default routes;