import {Router} from 'express';
import { getDatosEmpleado, registarEmpleado } from '../controllers/empleadoControllers';
import { decodificarToken } from '../middleware/auth'; 
const empleadoRouter = Router();

empleadoRouter.post('/',registarEmpleado);
empleadoRouter.get('/home',decodificarToken,getDatosEmpleado);
export default empleadoRouter; 
