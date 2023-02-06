"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../connect/connect"));
const TypeUsuarios = connect_1.default.define("usuario", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.STRING,
    },
    cc: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rol: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
});
exports.default = TypeUsuarios;
//# sourceMappingURL=usuarioModel.js.map