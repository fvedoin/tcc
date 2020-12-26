import express from 'express';

import FinalReportController from './controllers/FinalReportController';
import PraticesController from './controllers/PraticesController';
import ProjectsController from './controllers/ProjectsController';
import RisksController from './controllers/RisksController';
import RisksPraticesController from './controllers/RisksPraticesController';
import SessionsController from './controllers/SessionController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

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

//Search pratices in the project
routes.put('/relation/:id', risksPraticesController.update);

//Finish project
routes.post('/finish-project', finalReportController.create);

//Select all pratices
routes.get('/pratices', praticesController.index);

//Select all risks
routes.get('/risks', risksController.index);

export default routes;