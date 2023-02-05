import { Request, Response } from "express";
import TypeAgendamiento from "../models/model/agendamientoModel";
import TypeEmpleado from "../models/model/empleadoModel";
import TypeUsuarios from "../models/model/usuarioModel";
export const todasLasCitas = async (req: Request, res: Response) => {
  try {
    if (req.dataUser.rol !== "admin")
      return res.status(401).json({ msgError: "Sin Autorizacion" });

    const todasLasCitas = await TypeAgendamiento.findAll();
    if (todasLasCitas.length == 0)
      return res.status(400).json({
        msgError: "No hay datos",
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
      where:{
        idEmpleado:body.medico
      }
    });
    if(!datosMedico)return res.status(404).json({
      msgError:'No existe un dato con este id'
    });
    const datosAgenda = await TypeAgendamiento.findAll({
      where:{
        idEmpleado: datosMedico.dataValues.id
      }
    })
    for (let index = 0; index < datosAgenda.length; index++) {
      const element = datosAgenda[index];

      const horaInicioDb = element.dataValues.hora_inicio.split(':');
      const horaFinalDb = element.dataValues.hora_final.split(':');
      const horaInicioBody = body.horaInicio.split(":");
      const horaFinalBody = body.horaFinal.split(":");

      if(){
        
      }
      if(horaInicioBody[0] === horaInicioDb[0] && horaFinalBody[0]===horaFinalDb[0]){  
        const minitoInicioBody = parseInt(horaInicioBody[1]);  
        const minitoFinalBody = parseInt(horaFinalBody[1]);  
        const minitoInicioDb = parseInt(horaInicioDb[1]);  
        const minitoFinaldb = parseInt(horaFinalDb[1]);  
        
        if(parseInt(horaInicioBody[1]) > parseInt(horaInicioDb[1]) && parseInt(horaFinalDb[1]) > parseInt(horaInicioBody[1])){
          return res.status(400).json({
            msgError:'El medico ya tiene este rango de horas asignadas'
          })
        }
      }

    }
    
    const agendarCitas = TypeAgendamiento.build({
      idEmpleado: datosMedico.dataValues.id,
      fecha: body.fecha,
      hora_inicio: body.horaInicio,
      hora_final: body.horaFinal
    });

    res.status(200).json({
      msg:'Agenda creada con exito'
    })
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msgError: "Problemas en el server",
    });
  }
};
