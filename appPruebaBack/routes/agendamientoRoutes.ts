import {Router} from 'express';
import { crearAgenda, obtenerCitasId, obtenerDatosParaCitas, todasLasCitas } from '../controllers/agendamientoControllers';
import { decodificarToken } from '../middleware/auth';
const agendamientoRouter = Router();

agendamientoRouter.get('/',decodificarToken,todasLasCitas);
agendamientoRouter.get('/user/:idUser',decodificarToken,obtenerCitasId);
agendamientoRouter.get('/admin',decodificarToken,obtenerDatosParaCitas);
agendamientoRouter.post('/admin/agregarAgenda',decodificarToken,crearAgenda);

export default agendamientoRouter; 