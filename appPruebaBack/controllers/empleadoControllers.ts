import { Request, Response } from "express";
import TypeEmpleado from "../models/model/empleadoModel";
import { v4 as uuidv4 } from "uuid";

export const registarEmpleado = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const validEmail = await TypeEmpleado.findOne({
      where: {
        email: body.email,
      },
    });

    if (validEmail)
      return res.status(400).json({
        error: "Ya se encuentra un usuario registrado con este email",
      });

    const validCC = await TypeEmpleado.findOne({
      where: {
        cc: body.cc,
      },
    });

    if (validCC)
      return res.status(400).json({
        error: "Ya se encuentra un usuario registrado con esta cédula",
      });

    const newUsuario = TypeEmpleado.build({
      idEmpleado: uuidv4(),
      cc: body.cc,
      nombre: body.nombre,
      edad: body.edad,
      email: body.email,
      contraseña: body.contraseña,
    });

    await newUsuario.save();
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: "Problemas en el servidor",
    });
  }
};

export const getDatosEmpleado = (req: Request, res: Response) => {
    const decode = req.dataUser;
  return res.json({
    msg: "Datos del usuario",
    decode,
  });
};
