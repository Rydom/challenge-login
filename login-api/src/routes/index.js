import { Router } from 'express'

import UserController from '../controllers/UserController'

const controller = new UserController();

const routes = Router();

routes.get('/:id?', controller.list)

routes.post('/', controller.create)

routes.put('/:id', controller.update)

routes.delete('/:id', controller.delete)

export default routes;