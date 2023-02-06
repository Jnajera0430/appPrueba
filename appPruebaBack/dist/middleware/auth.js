"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodificarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generarToken(rol, datos) {
    const token = jsonwebtoken_1.default.sign({ rol, datos }, `${process.env.SECRET_API_KEY}`, {
        algorithm: "HS256",
        expiresIn: 60 * 60,
    });
    return token;
}
exports.generarToken = generarToken;
function decodificarToken(req, res, next) {
    const { token } = req.headers;
    try {
        jsonwebtoken_1.default.verify(`${token}`, `${process.env.SECRET_API_KEY}`, (err, datos) => {
            if (err)
                return res.status(401).json({
                    msgError: "Usuario sin autorización",
                });
            req.dataUser = datos;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({
            msgError: "Problemas con el token",
        });
    }
}
exports.decodificarToken = decodificarToken;
//# sourceMappingURL=auth.js.map