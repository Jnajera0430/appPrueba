"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatosEmpleado = exports.registarEmpleado = void 0;
const empleadoModel_1 = __importDefault(require("../models/model/empleadoModel"));
const uuid_1 = require("uuid");
const registarEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const validEmail = yield empleadoModel_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (validEmail)
            return res.status(400).json({
                error: "Ya se encuentra un usuario registrado con este email",
            });
        const validCC = yield empleadoModel_1.default.findOne({
            where: {
                cc: body.cc,
            },
        });
        if (validCC)
            return res.status(400).json({
                error: "Ya se encuentra un usuario registrado con esta cédula",
            });
        const newUsuario = empleadoModel_1.default.build({
            idEmpleado: (0, uuid_1.v4)(),
            cc: body.cc,
            nombre: body.nombre,
            edad: body.edad,
            email: body.email,
            contraseña: body.contraseña,
        });
        yield newUsuario.save();
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            error: "Problemas en el servidor",
        });
    }
});
exports.registarEmpleado = registarEmpleado;
const getDatosEmpleado = (req, res) => {
    const decode = req.dataUser;
    return res.json({
        msg: "Datos del usuario",
        decode,
    });
};
exports.getDatosEmpleado = getDatosEmpleado;
//# sourceMappingURL=empleadoControllers.js.map