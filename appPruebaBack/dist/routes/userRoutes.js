"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.get('/', userControllers_1.todosLosUsuarios);
userRouter.post('/', userControllers_1.registarUsuario);
userRouter.post('/login', userControllers_1.loginUsuario);
userRouter.get('/home', auth_1.decodificarToken, userControllers_1.getDatosUser);
userRouter.get('/citas', auth_1.decodificarToken, userControllers_1.getCitasDisponible);
userRouter.get('/citas/user/:idUser', auth_1.decodificarToken, userControllers_1.obtenerCitasId);
userRouter.put('/citas/agendarCita/:idUser/:idCita', auth_1.decodificarToken, userControllers_1.agendarCitasUsuario);
userRouter.put('/citas/cofirmar/:idUser/:idCita', auth_1.decodificarToken, userControllers_1.confirmarCitaUsuario);
userRouter.delete('/citas/cancelar/:idUser/:idCita', auth_1.decodificarToken, userControllers_1.cancelarCitaUsuario);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map