import {Router} from 'express';
import { confirmarCitasAdmin, crearAgenda, deleteCita, editCita, obtenerCitasId, obtenerDatosParaCitas, todasLasCitas } from '../controllers/agendamientoControllers';
import { decodificarToken } from '../middleware/auth';
const agendamientoRouter = Router();

agendamientoRouter.get('/',decodificarToken,todasLasCitas);
agendamientoRouter.get('/user/:idUser',decodificarToken,obtenerCitasId);
agendamientoRouter.get('/admin',decodificarToken,obtenerDatosParaCitas);
agendamientoRouter.post('/admin/agregarAgenda',decodificarToken,crearAgenda);
agendamientoRouter.put('/admin/confirmar/:idCita',decodificarToken,confirmarCitasAdmin);
agendamientoRouter.put('/admin/editAgenda/:idCita',decodificarToken,editCita);
agendamientoRouter.delete('/admin/deleteAgenda/:idCita',decodificarToken,deleteCita);

export default agendamientoRouter; 