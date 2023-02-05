import {Router} from 'express';
import { getDatosUser, loginUsuario, registarUsuario, todosLosUsuarios } from '../controllers/userControllers';
import { decodificarToken } from '../middleware/auth';
const userRouter = Router();

userRouter.get('/',todosLosUsuarios);
userRouter.post('/',registarUsuario);
userRouter.post('/login',loginUsuario);
userRouter.get('/home',decodificarToken,getDatosUser);
export default userRouter;