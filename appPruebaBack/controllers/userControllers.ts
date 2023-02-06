import { Request, Response } from "express";
import TypeUsuarios from "../models/model/usuarioModel";
import { v4 as uuidv4 } from "uuid";
import { generarToken } from "../middleware/auth";
import TypeEmpleado from "../models/model/empleadoModel";
import TypeAgendamiento from "../models/model/agendamientoModel";
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

export const getCitasDisponible = async (req: Request, res: Response) => {
  try {
    const decode = req.dataUser;
    if (decode.rol !== "user")
      return res.status(401).json({
        msgError: "Usuario sin autorizacion para realizar esta accion",
      });

    TypeAgendamiento.belongsTo(TypeEmpleado, {
      foreignKey: "idEmpleado",
      targetKey: "id",
    });
    const citasDisponibles = await TypeAgendamiento.findAll({
      where: {
        estado: null,
      },
      attributes: {
        exclude: ["idEmpleado", "idUser", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: TypeEmpleado,
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
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msgError: "Problemas en el servidor" });
  }
};

export const agendarCitasUsuario = async (req: Request, res: Response) => {
  const { idUser, idCita } = req.params;
  try {
    const user = await TypeUsuarios.findOne({
      where: {
        idUSer: idUser,
      },
    });
    if (!user)
      return res.status(404).json({
        msgError: "Usuario no encontrado",
      });
    const citasUser = await TypeAgendamiento.findAll({
      where: {
        idUser: user.dataValues.id,
      },
    });

    if (citasUser.length >= 2)
      return res.status(400).json({
        msgError:
          "El usuario a excedido el numero de citas disponibles por usuarios",
      });
    const citaaAgendar = await TypeAgendamiento.findByPk(idCita);
    if (!citaaAgendar)
      return res
        .status(400)
        .json({ msgErro: "Citas no encontrada en la base de datos" });

    const valid = citasUser.some(
      (cita) =>
        cita.dataValues.fecha === citaaAgendar?.dataValues.fecha &&
        cita.dataValues.idEmpleado === citaaAgendar.dataValues.idEmpleado
    );
    if (valid)
      return res.status(400).json({
        msgError:
          "El usuario ya tiene una cita asignada y solo se acepta una cita por dia",
      });
    await citaaAgendar?.update({
      idUser: user.dataValues.id,
      estado: false,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msgError: "Problemas en el servidor" });
  }
};

export const obtenerCitasId = async (req: Request, res: Response) => {
  const { idUser } = req.params;
  try {
    const user = await TypeUsuarios.findOne({
      where: {
        idUser: idUser,
      },
    });
    if (!user)
      return res.status(400).json({
        msg: "No se encontró un usuario con este id",
      });
    TypeAgendamiento.belongsTo(TypeEmpleado, {
      foreignKey: "idEmpleado",
      targetKey: "id",
    });
    const citasUsuario = await TypeAgendamiento.findAll({
      where: {
        idUser: user.dataValues.id,
      },
      attributes: {
        exclude: ["idEmpleado", "idUser", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: TypeEmpleado,
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
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msgError: "Problemas en el servidor" });
  }
};

export const confirmarCitaUsuario = async (req: Request, res: Response) => {
  const { idUser, idCita } = req.params;
  try {
    const user = await TypeUsuarios.findOne({
      where: {
        idUser: idUser,
      },
    });
    if (!user)
      return res.status(400).json({
        msgError: "No se encontró un usuario con este id",
      });

    const citaUsuario = await TypeAgendamiento.findByPk(idCita);
    if (!citaUsuario)
      return res
        .status(400)
        .json({ msgErro: "Citas no encontrada en la base de datos" });
    await citaUsuario.update({ confirmacion: true });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msgError: "Problemas en el servidor" });
  }
};

export const cancelarCitaUsuario = async (req: Request, res: Response) => {
  const { idUser, idCita } = req.params;
  
  try {
    const user = await TypeUsuarios.findOne({
      where: {
        idUser: idUser,
      },
    });
    if (!user)
      return res.status(400).json({
        msgError: "No se encontró un usuario con este id",
      });

    const citaUsuario = await TypeAgendamiento.findByPk(idCita);
    if (!citaUsuario)
      return res
        .status(400)
        .json({ msgErro: "Cita no encontrada en la base de datos" });

    await citaUsuario.update({ confirmacion: false, idUser:null, estado:null });
    
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msgError: "Problemas en el servidor" });
  }
};
