import express from 'express';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const classesController = new UsersController();

routes.get('/users', classesController.index);

export default routes;