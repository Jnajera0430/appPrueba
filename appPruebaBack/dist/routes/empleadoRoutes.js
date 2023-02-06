"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleadoControllers_1 = require("../controllers/empleadoControllers");
const auth_1 = require("../middleware/auth");
const empleadoRouter = (0, express_1.Router)();
empleadoRouter.post('/', empleadoControllers_1.registarEmpleado);
empleadoRouter.get('/home', auth_1.decodificarToken, empleadoControllers_1.getDatosEmpleado);
exports.default = empleadoRouter;
//# sourceMappingURL=empleadoRoutes.js.map