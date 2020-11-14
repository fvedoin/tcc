import express from 'express';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const classesController = new UsersController();

routes.get('/users', classesController.index);
routes.post('/users', classesController.create);

export default routes;