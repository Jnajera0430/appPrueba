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
exports.cancelarCitaUsuario = exports.confirmarCitaUsuario = exports.obtenerCitasId = exports.agendarCitasUsuario = exports.getCitasDisponible = exports.getDatosUser = exports.loginUsuario = exports.registarUsuario = exports.todosLosUsuarios = void 0;
const usuarioModel_1 = __importDefault(require("../models/model/usuarioModel"));
const uuid_1 = require("uuid");
const auth_1 = require("../middleware/auth");
const empleadoModel_1 = __importDefault(require("../models/model/empleadoModel"));
const agendamientoModel_1 = __importDefault(require("../models/model/agendamientoModel"));
const todosLosUsuarios = (req, res) => {
    return res.json({
        msg: "algo",
    });
};
exports.todosLosUsuarios = todosLosUsuarios;
const registarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const validEmail = yield usuarioModel_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (validEmail)
            return res.status(400).json({
                error: "Ya se encuentra un usuario registrado con este email",
            });
        const validCC = yield usuarioModel_1.default.findOne({
            where: {
                cc: body.cc,
            },
        });
        if (validCC)
            return res.status(400).json({
                error: "Ya se encuentra un usuario registrado con esta cédula",
            });
        const newUsuario = usuarioModel_1.default.build({
            idUser: (0, uuid_1.v4)(),
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
exports.registarUsuario = registarUsuario;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const loginUser = yield usuarioModel_1.default.findOne({
            where: {
                email: body.email,
                contraseña: body.contraseña,
            },
            attributes: {
                exclude: ["id", "createdAt", "updatedAt", "contraseña"],
            },
        });
        const loginEmpleado = yield empleadoModel_1.default.findOne({
            where: {
                email: body.email,
                contraseña: body.contraseña,
            },
            attributes: {
                exclude: ["id", "createdAt", "updatedAt", "contraseña"],
            },
        });
        if (!loginUser && !loginEmpleado)
            return res.status(401).json({
                msgError: "Credenciales incorrectas",
            });
        let token;
        if (loginUser) {
            token = (0, auth_1.generarToken)(loginUser.dataValues.rol, loginUser.dataValues);
            return res.status(200).json({
                msg: "el usario ha iniciado seccion",
                token,
            });
        }
        if (loginEmpleado) {
            token = (0, auth_1.generarToken)(loginEmpleado.dataValues.rol, loginEmpleado.dataValues);
            return res.status(200).json({
                msg: "el usario ha iniciado seccion",
                token,
            });
        }
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            error: "Problemas en el servidor",
        });
    }
});
exports.loginUsuario = loginUsuario;
const getDatosUser = (req, res) => {
    const decode = req.dataUser;
    return res.json({
        msg: "Datos del usuario",
        decode,
    });
};
exports.getDatosUser = getDatosUser;
const getCitasDisponible = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = req.dataUser;
        if (decode.rol !== "user")
            return res.status(401).json({
                msgError: "Usuario sin autorizacion para realizar esta accion",
            });
        agendamientoModel_1.default.belongsTo(empleadoModel_1.default, {
            foreignKey: "idEmpleado",
            targetKey: "id",
        });
        const citasDisponibles = yield agendamientoModel_1.default.findAll({
            where: {
                estado: null,
            },
            attributes: {
                exclude: ["idEmpleado", "idUser", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: empleadoModel_1.default,
                    attributes: {
                        exclude: ["id", "contraseña", "createdAt", "updatedAt"],
                    },
                },
            ],
        });
        return res.status(200).json({
            msg: "citas disponible enviadas con exito",
            citasDisponibles,
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msgError: "Problemas en el servidor" });
    }
});
exports.getCitasDisponible = getCitasDisponible;
const agendarCitasUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idCita } = req.params;
    try {
        const user = yield usuarioModel_1.default.findOne({
            where: {
                idUSer: idUser,
            },
        });
        if (!user)
            return res.status(404).json({
                msgError: "Usuario no encontrado",
            });
        const citasUser = yield agendamientoModel_1.default.findAll({
            where: {
                idUser: user.dataValues.id,
            },
        });
        if (citasUser.length >= 2)
            return res.status(400).json({
                msgError: "El usuario a excedido el numero de citas disponibles por usuarios",
            });
        const citaaAgendar = yield agendamientoModel_1.default.findByPk(idCita);
        if (!citaaAgendar)
            return res
                .status(400)
                .json({ msgErro: "Citas no encontrada en la base de datos" });
        const valid = citasUser.some((cita) => cita.dataValues.fecha === (citaaAgendar === null || citaaAgendar === void 0 ? void 0 : citaaAgendar.dataValues.fecha) &&
            cita.dataValues.idEmpleado === citaaAgendar.dataValues.idEmpleado);
        if (valid)
            return res.status(400).json({
                msgError: "El usuario ya tiene una cita asignada y solo se acepta una cita por dia",
            });
        yield (citaaAgendar === null || citaaAgendar === void 0 ? void 0 : citaaAgendar.update({
            idUser: user.dataValues.id,
            estado: false,
        }));
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msgError: "Problemas en el servidor" });
    }
});
exports.agendarCitasUsuario = agendarCitasUsuario;
const obtenerCitasId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    try {
        const user = yield usuarioModel_1.default.findOne({
            where: {
                idUser: idUser,
            },
        });
        if (!user)
            return res.status(400).json({
                msg: "No se encontró un usuario con este id",
            });
        agendamientoModel_1.default.belongsTo(empleadoModel_1.default, {
            foreignKey: "idEmpleado",
            targetKey: "id",
        });
        const citasUsuario = yield agendamientoModel_1.default.findAll({
            where: {
                idUser: user.dataValues.id,
            },
            attributes: {
                exclude: ["idEmpleado", "idUser", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: empleadoModel_1.default,
                    attributes: {
                        exclude: ["id", "contraseña", "createdAt", "updatedAt"],
                    },
                },
            ],
        });
        res.status(200).json({
            msg: "datos enviados con exito",
            citasUsuario,
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msgError: "Problemas en el servidor" });
    }
});
exports.obtenerCitasId = obtenerCitasId;
const confirmarCitaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idCita } = req.params;
    try {
        const user = yield usuarioModel_1.default.findOne({
            where: {
                idUser: idUser,
            },
        });
        if (!user)
            return res.status(400).json({
                msgError: "No se encontró un usuario con este id",
            });
        const citaUsuario = yield agendamientoModel_1.default.findByPk(idCita);
        if (!citaUsuario)
            return res
                .status(400)
                .json({ msgErro: "Citas no encontrada en la base de datos" });
        yield citaUsuario.update({ confirmacion: true });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msgError: "Problemas en el servidor" });
    }
});
exports.confirmarCitaUsuario = confirmarCitaUsuario;
const cancelarCitaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idCita } = req.params;
    try {
        const user = yield usuarioModel_1.default.findOne({
            where: {
                idUser: idUser,
            },
        });
        if (!user)
            return res.status(400).json({
                msgError: "No se encontró un usuario con este id",
            });
        const citaUsuario = yield agendamientoModel_1.default.findByPk(idCita);
        if (!citaUsuario)
            return res
                .status(400)
                .json({ msgErro: "Cita no encontrada en la base de datos" });
        yield citaUsuario.update({ confirmacion: false, idUser: null, estado: null });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msgError: "Problemas en el servidor" });
    }
});
exports.cancelarCitaUsuario = cancelarCitaUsuario;
//# sourceMappingURL=userControllers.js.map