import { Request, Response } from "express";
import TypeAgendamiento from "../models/model/agendamientoModel";
import TypeEmpleado from "../models/model/empleadoModel";
import TypeUsuarios from "../models/model/usuarioModel";
export const todasLasCitas = async (req: Request, res: Response) => {
  try {
    if (req.dataUser.rol !== "admin")
      return res.status(401).json({ msgError: "Sin Autorizacion" });
    TypeAgendamiento.belongsTo(TypeEmpleado, {
      targetKey: "id",
      foreignKey: "idEmpleado",
    });
    TypeAgendamiento.belongsTo(TypeUsuarios, {
      targetKey: "id",
      foreignKey: "idUser",
    });
    const todasLasCitas = await TypeAgendamiento.findAll({
      include: [
        {
          model: TypeEmpleado,
          attributes: {
            exclude: ["id", "contraseña", "createdAt", "updatedAt"],
          },
        },
        { model: TypeUsuarios },
      ],
    });

    res.json({
      msg: "listo llegó",
      todasLasCitas,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};

export const obtenerCitasId = async (req: Request, res: Response) => {
  const { idUser } = req.params;
  try {
    if (req.dataUser.rol !== "user")
      return res.status(401).json({ msgError: "Sin Autorizacion" });

    const usuario = await TypeUsuarios.findOne({
      where: {
        idUser,
      },
    });
    if (!usuario)
      return res.status(404).json({
        msgError: "No se ha encontrado este usuario",
      });

    const todasLasCitas = await TypeAgendamiento.findOne({
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
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};

export const obtenerDatosParaCitas = async (req: Request, res: Response) => {
  try {
    if (req.dataUser.rol !== "admin")
      return res.status(401).json({
        msgError: "Usuario sin autorizacion",
      });
    const empleados = await TypeEmpleado.findAll({
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    });
    res.status(200).json({
      msg: "datos han llegado con exito",
      empleados,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};

export const crearAgenda = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const datosMedico = await TypeEmpleado.findOne({
      where: {
        idEmpleado: body.medico,
      },
    });
    if (!datosMedico)
      return res.status(404).json({
        msgError: "No existe un dato con este id",
      });
    const datosAgenda = await TypeAgendamiento.findAll({
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
        if (
          (horaInicioBody[0] === horaInicioDb[0] &&
            horaInicioBody[1] === horaInicioDb[1]) ||
          (horaFinalBody[0] === horaFinalDb[0] &&
            horaFinalBody[1] === horaFinalDb[1])
        )
          return res.status(400).json({
            msgError: "El medico ya tiene este rango de horas asignadas",
          });
        if (horaInicioBody[0] === horaInicioDb[0]) {
          if (
            minitoInicioDb < minitoInicioBody &&
            minitoFinaldb < minitoFinalBody
          ) {
            console.log(body.fecha);
            console.log(element.dataValues.fecha);
            console.log("algo");
            return res.status(400).json({
              msgError: "El medico ya tiene este rango de horas asignadas",
            });
          }
          if (
            minitoInicioDb > minitoInicioBody &&
            minitoInicioDb < minitoFinalBody
          ) {
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
      if (
        parseInt(horaInicioBody[0]) == parseInt(horaInicioDb[0]) - 1 &&
        minitoInicioBody > 30 &&
        minitoFinalBody < minitoFinaldb
      ) {
        return res.status(400).json({
          msgError: "El medico ya tiene este rango de horas asignadas",
        });
      }
      if (
        parseInt(horaInicioBody[0]) == parseInt(horaInicioDb[0]) + 1 &&
        minitoInicioDb > 30 &&
        minitoInicioDb > minitoInicioBody &&
        minitoInicioDb > minitoFinalBody
      ) {
        return res.status(400).json({
          msgError: "El medico ya tiene este rango de horas asignadas",
        });
      }
    }

    const agendarCitas = TypeAgendamiento.build({
      idEmpleado: datosMedico.dataValues.id,
      fecha: body.fecha,
      hora_inicio: body.horaInicio,
      hora_final: body.horaFinal,
    });
    agendarCitas.save();
    res.status(200).json({
      msg: "Agenda creada con exito",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};

export const editCita = async (req: Request, res: Response) => {
  const { idCita } = req.params;
  try {
    const citaAgendada = await TypeAgendamiento.findByPk(idCita);
    if (!citaAgendada)
      return res.status(404).json({
        msgError: "No se encontró una cita con este id",
      });

    await citaAgendada.update({ confirmacion: true });
    return res.status(200).json({
      msg: "La agenda fue confirmada",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};

export const deleteCita = async (req: Request, res: Response) => {
  const { idCita } = req.params;
  try {
    const citaAgendada = await TypeAgendamiento.findByPk(idCita);
    if (!citaAgendada)
      return res.status(404).json({
        msgError: "No se encontró una cita con este id",
      });

    await citaAgendada.destroy();
    return res.status(200).json({
      msg: "La agenda fue eliminada con exito",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};

export const confirmarCitasAdmin = async (req: Request, res: Response) => {
  const { idCita } = req.params;
  try {
    const citaUsuario = await TypeAgendamiento.findByPk(idCita);
    if (!citaUsuario)
      return res
        .status(400)
        .json({ msgErro: "Cita no encontrada en la base de datos" });
    if (!citaUsuario.dataValues.idUser)
      return res.status(400).json({
        msgError: "La cita no se encuentra agendada",
      });
    citaUsuario.update({estado:true});
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};
