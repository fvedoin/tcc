import express from 'express';
import PraticesController from './controllers/PraticesController';
import ProjectsController from './controllers/ProjectsController';
import RisksController from './controllers/RisksController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const usersController = new UsersController();
const projectsController = new ProjectsController();
const praticesController = new PraticesController();
const risksController = new RisksController();

routes.get('/users', usersController.index);
routes.post('/users', usersController.create);

routes.post('/projects', projectsController.create);

routes.get('/pratices', praticesController.index);
routes.get('/risks', risksController.index);

export default routes;