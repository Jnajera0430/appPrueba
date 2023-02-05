import { Request, Response } from "express";
import TypeUsuarios from "../models/model/usuarioModel";
import { v4 as uuidv4 } from "uuid";
import { generarToken } from "../middleware/auth";
import TypeEmpleado from "../models/model/empleadoModel";
export const todosLosUsuarios = (req: Request, res: Response) => {
  return res.json({
    msg: "algo",
  });
};

export const registarUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const validEmail = await TypeUsuarios.findOne({
      where: {
        email: body.email,
      },
    });

    if (validEmail)
      return res.status(400).json({
        error: "Ya se encuentra un usuario registrado con este email",
      });

    const validCC = await TypeUsuarios.findOne({
      where: {
        cc: body.cc,
      },
    });

    if (validCC)
      return res.status(400).json({
        error: "Ya se encuentra un usuario registrado con esta cédula",
      });

    const newUsuario = TypeUsuarios.build({
      idUser: uuidv4(),
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

export const loginUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);

  try {
    const loginUser = await TypeUsuarios.findOne({
      where: {
        email: body.email,
        contraseña: body.contraseña,
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "contraseña"],
      },
    });

    const loginEmpleado = await TypeEmpleado.findOne({
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

    let token: string;
    if (loginUser) {
      token = generarToken(loginUser.dataValues.rol, loginUser.dataValues);
      return res.status(200).json({
        msg: "el usario ha iniciado seccion",
        token,
      });
    }
    if (loginEmpleado) {
      token = generarToken(
        loginEmpleado.dataValues.rol,
        loginEmpleado.dataValues
      );
      return res.status(200).json({
        msg: "el usario ha iniciado seccion",
        token,
      });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      error: "Problemas en el servidor",
    });
  }
};

export const getDatosUser = (req: Request, res: Response) => {
  const decode = req.dataUser;
  return res.json({
    msg: "Datos del usuario",
    decode,
  });
};
