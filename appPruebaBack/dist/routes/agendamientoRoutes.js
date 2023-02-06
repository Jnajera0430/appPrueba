"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agendamientoControllers_1 = require("../controllers/agendamientoControllers");
const auth_1 = require("../middleware/auth");
const agendamientoRouter = (0, express_1.Router)();
agendamientoRouter.get('/', auth_1.decodificarToken, agendamientoControllers_1.todasLasCitas);
agendamientoRouter.get('/user/:idUser', auth_1.decodificarToken, agendamientoControllers_1.obtenerCitasId);
agendamientoRouter.get('/admin', auth_1.decodificarToken, agendamientoControllers_1.obtenerDatosParaCitas);
agendamientoRouter.post('/admin/agregarAgenda', auth_1.decodificarToken, agendamientoControllers_1.crearAgenda);
agendamientoRouter.put('/admin/confirmar/:idCita', auth_1.decodificarToken, agendamientoControllers_1.confirmarCitasAdmin);
agendamientoRouter.put('/admin/editAgenda/:idCita', auth_1.decodificarToken, agendamientoControllers_1.editCita);
agendamientoRouter.delete('/admin/deleteAgenda/:idCita', auth_1.decodificarToken, agendamientoControllers_1.deleteCita);
exports.default = agendamientoRouter;
//# sourceMappingURL=agendamientoRoutes.js.map