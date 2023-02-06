import {Router} from 'express';
import { agendarCitasUsuario, cancelarCitaUsuario, confirmarCitaUsuario, getCitasDisponible, getDatosUser, loginUsuario, obtenerCitasId, registarUsuario, todosLosUsuarios } from '../controllers/userControllers';
import { decodificarToken } from '../middleware/auth';
const userRouter = Router();

userRouter.get('/',todosLosUsuarios);
userRouter.post('/',registarUsuario);
userRouter.post('/login',loginUsuario);
userRouter.get('/home',decodificarToken,getDatosUser);
userRouter.get('/citas',decodificarToken,getCitasDisponible);
userRouter.get('/citas/user/:idUser',decodificarToken,obtenerCitasId);
userRouter.put('/citas/agendarCita/:idUser/:idCita',decodificarToken,agendarCitasUsuario);
userRouter.put('/citas/cofirmar/:idUser/:idCita',decodificarToken,confirmarCitaUsuario);
userRouter.delete('/citas/cancelar/:idUser/:idCita',decodificarToken,cancelarCitaUsuario);
export default userRouter;