import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function generarToken(rol: string, datos: object): string {
  const token = jwt.sign({ rol, datos }, `${process.env.SECRET_API_KEY}`, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
  return token;
}

export function decodificarToken(
  req: Request,
  res: Response,
  next: NextFunction
): object | any {
  const { token } = req.headers;
  try {
    jwt.verify(
      `${token}`,
      `${process.env.SECRET_API_KEY}`,
      (err: any, datos: any) => {
        if (err)
          return res.status(401).json({
            msgError: "Usuario sin autorización",
          });
        req.dataUser = datos;
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({
      msgError: "Problemas con el token",
    });
  }
}
