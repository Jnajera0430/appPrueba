"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../connect/connect"));
const TypeAgendamiento = connect_1.default.define("agendamientos", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    hora_inicio: {
        type: sequelize_1.DataTypes.TIME,
    },
    hora_final: {
        type: sequelize_1.DataTypes.TIME,
    },
    confirmacion: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
});
exports.default = TypeAgendamiento;
//# sourceMappingURL=agendamientoModel.js.map