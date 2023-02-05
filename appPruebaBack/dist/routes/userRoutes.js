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
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map