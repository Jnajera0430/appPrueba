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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const connect_1 = __importDefault(require("../connect/connect"));
const agendamientoRoutes_1 = __importDefault(require("../routes/agendamientoRoutes"));
const empleadoRoutes_1 = __importDefault(require("../routes/empleadoRoutes"));
class Server {
    constructor() {
        this.apiPaths = {
            user: "/app/users",
            empleado: '/app/empleado',
            agendamiento: '/app/agendamiento',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8001";
        this.connect();
        this.middlewares();
        this.routes();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connect_1.default.authenticate();
                console.log("Base datos conectada");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: 'http://127.0.0.1:5173',
            credentials: true
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.user, userRoutes_1.default);
        this.app.use(this.apiPaths.agendamiento, agendamientoRoutes_1.default);
        this.app.use(this.apiPaths.empleado, empleadoRoutes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map