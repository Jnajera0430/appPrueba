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
exports.confirmarCitasAdmin = exports.deleteCita = exports.editCita = exports.crearAgenda = exports.obtenerDatosParaCitas = exports.obtenerCitasId = exports.todasLasCitas = void 0;
const agendamientoModel_1 = __importDefault(require("../models/model/agendamientoModel"));
const empleadoModel_1 = __importDefault(require("../models/model/empleadoModel"));
const usuarioModel_1 = __importDefault(require("../models/model/usuarioModel"));
const todasLasCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.dataUser.rol !== "admin")
            return res.status(401).json({ msgError: "Sin Autorizacion" });
        agendamientoModel_1.default.belongsTo(empleadoModel_1.default, {
            targetKey: "id",
            foreignKey: "idEmpleado",
        });
        agendamientoModel_1.default.belongsTo(usuarioModel_1.default, {
            targetKey: "id",
            foreignKey: "idUser",
        });
        const todasLasCitas = yield agendamientoModel_1.default.findAll({
            include: [
                {
                    model: empleadoModel_1.default,
                    attributes: {
                        exclude: ["id", "contraseña", "createdAt", "updatedAt"],
                    },
                },
                { model: usuarioModel_1.default },
            ],
        });
        res.json({
            msg: "listo llegó",
            todasLasCitas,
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.todasLasCitas = todasLasCitas;
const obtenerCitasId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    try {
        if (req.dataUser.rol !== "user")
            return res.status(401).json({ msgError: "Sin Autorizacion" });
        const usuario = yield usuarioModel_1.default.findOne({
            where: {
                idUser,
            },
        });
        if (!usuario)
            return res.status(404).json({
                msgError: "No se ha encontrado este usuario",
            });
        const todasLasCitas = yield agendamientoModel_1.default.findOne({
            where: {
                idUser: usuario.dataValues.id,
            },
        });
        if (!todasLasCitas)
            return res.status(400).json({
                msgError: "Este usuario no tiene citas agendadas",
            });
        res.status(200).json({
            msg: "Datos entregados con exito",
            todasLasCitas,
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.obtenerCitasId = obtenerCitasId;
const obtenerDatosParaCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.dataUser.rol !== "admin")
            return res.status(401).json({
                msgError: "Usuario sin autorizacion",
            });
        const empleados = yield empleadoModel_1.default.findAll({
            attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
            },
        });
        res.status(200).json({
            msg: "datos han llegado con exito",
            empleados,
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.obtenerDatosParaCitas = obtenerDatosParaCitas;
const crearAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const datosMedico = yield empleadoModel_1.default.findOne({
            where: {
                idEmpleado: body.medico,
            },
        });
        if (!datosMedico)
            return res.status(404).json({
                msgError: "No existe un dato con este id",
            });
        const datosAgenda = yield agendamientoModel_1.default.findAll({
            where: {
                idEmpleado: datosMedico.dataValues.id,
            },
        });
        for (let index = 0; index < datosAgenda.length; index++) {
            const element = datosAgenda[index];
            const horaInicioDb = element.dataValues.hora_inicio.split(":");
            const horaFinalDb = element.dataValues.hora_final.split(":");
            const horaInicioBody = body.horaInicio.split(":");
            const horaFinalBody = body.horaFinal.split(":");
            const minitoInicioBody = parseInt(horaInicioBody[1]);
            const minitoFinalBody = parseInt(horaFinalBody[1]);
            const minitoInicioDb = parseInt(horaInicioDb[1]);
            const minitoFinaldb = parseInt(horaFinalDb[1]);
            if (body.fecha === element.dataValues.fecha) {
                if ((horaInicioBody[0] === horaInicioDb[0] &&
                    horaInicioBody[1] === horaInicioDb[1]) ||
                    (horaFinalBody[0] === horaFinalDb[0] &&
                        horaFinalBody[1] === horaFinalDb[1]))
                    return res.status(400).json({
                        msgError: "El medico ya tiene este rango de horas asignadas",
                    });
                if (horaInicioBody[0] === horaInicioDb[0]) {
                    if (minitoInicioDb < minitoInicioBody &&
                        minitoFinaldb < minitoFinalBody) {
                        console.log(body.fecha);
                        console.log(element.dataValues.fecha);
                        console.log("algo");
                        return res.status(400).json({
                            msgError: "El medico ya tiene este rango de horas asignadas",
                        });
                    }
                    if (minitoInicioDb > minitoInicioBody &&
                        minitoInicioDb < minitoFinalBody) {
                        console.log(body.fecha);
                        console.log(element.dataValues.fecha);
                        console.log("algo");
                        return res.status(400).json({
                            msgError: "El medico ya tiene este rango de horas asignadas",
                        });
                    }
                    if (minitoInicioDb === minitoInicioBody) {
                        console.log(body.fecha);
                        console.log(element.dataValues.fecha);
                        console.log("algo");
                        return res.status(400).json({
                            msgError: "El medico ya tiene este rango de horas asignadas",
                        });
                    }
                }
            }
            if (parseInt(horaInicioBody[0]) == parseInt(horaInicioDb[0]) - 1 &&
                minitoInicioBody > 30 &&
                minitoFinalBody < minitoFinaldb) {
                return res.status(400).json({
                    msgError: "El medico ya tiene este rango de horas asignadas",
                });
            }
            if (parseInt(horaInicioBody[0]) == parseInt(horaInicioDb[0]) + 1 &&
                minitoInicioDb > 30 &&
                minitoInicioDb > minitoInicioBody &&
                minitoInicioDb > minitoFinalBody) {
                return res.status(400).json({
                    msgError: "El medico ya tiene este rango de horas asignadas",
                });
            }
        }
        const agendarCitas = agendamientoModel_1.default.build({
            idEmpleado: datosMedico.dataValues.id,
            fecha: body.fecha,
            hora_inicio: body.horaInicio,
            hora_final: body.horaFinal,
        });
        agendarCitas.save();
        res.status(200).json({
            msg: "Agenda creada con exito",
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.crearAgenda = crearAgenda;
const editCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCita } = req.params;
    try {
        const citaAgendada = yield agendamientoModel_1.default.findByPk(idCita);
        if (!citaAgendada)
            return res.status(404).json({
                msgError: "No se encontró una cita con este id",
            });
        yield citaAgendada.update({ confirmacion: true });
        return res.status(200).json({
            msg: "La agenda fue confirmada",
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.editCita = editCita;
const deleteCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCita } = req.params;
    try {
        const citaAgendada = yield agendamientoModel_1.default.findByPk(idCita);
        if (!citaAgendada)
            return res.status(404).json({
                msgError: "No se encontró una cita con este id",
            });
        yield citaAgendada.destroy();
        return res.status(200).json({
            msg: "La agenda fue eliminada con exito",
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.deleteCita = deleteCita;
const confirmarCitasAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCita } = req.params;
    try {
        const citaUsuario = yield agendamientoModel_1.default.findByPk(idCita);
        if (!citaUsuario)
            return res
                .status(400)
                .json({ msgErro: "Cita no encontrada en la base de datos" });
        if (!citaUsuario.dataValues.idUser)
            return res.status(400).json({
                msgError: "La cita no se encuentra agendada",
            });
        citaUsuario.update({ estado: true });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            msgError: "Problemas en el server",
        });
    }
});
exports.confirmarCitasAdmin = confirmarCitasAdmin;
//# sourceMappingURL=agendamientoControllers.js.map