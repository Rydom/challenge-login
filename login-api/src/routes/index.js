import { Router } from 'express'

import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'

const authController = new AuthController();
const userController = new UserController();

const routes = Router();

routes.post('/login', authController.login)

routes.put('/reset_password', authController.reset_password)

routes.post('/sign_up', userController.create)

export default routes;