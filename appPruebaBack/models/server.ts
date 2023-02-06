import express, { Application } from "express";
import cors from "cors";
import userRouter from "../routes/userRoutes";
import db from "../connect/connect";
import agendamientoRouter from "../routes/agendamientoRoutes";
import empleadoRouter from "../routes/empleadoRoutes";
export default class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    user: "/app/users",
    empleado:'/app/empleado',
    agendamiento:'/app/agendamiento',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8001";
    this.connect();
    this.middlewares();
    this.routes();
  }

  async connect() {
    try {
      await db.authenticate();
      console.log("Base datos conectada");
    } catch (error: any) {
      throw new Error(error); 
    }
  }

  middlewares() {
    this.app.use(cors({
      origin:'http://127.0.0.1:5173',
      credentials:true
    }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.user, userRouter);
    this.app.use(this.apiPaths.agendamiento, agendamientoRouter);
    this.app.use(this.apiPaths.empleado, empleadoRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}`);
    });
  }
}
