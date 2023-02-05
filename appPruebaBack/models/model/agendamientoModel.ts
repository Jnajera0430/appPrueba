import { DataTypes } from "sequelize";
import db from "../../connect/connect";

const TypeAgendamiento = db.define("agendamientos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.INTEGER,
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  hora_inicio: {
    type: DataTypes.TIME,
  },
  hora_final: {
    type: DataTypes.TIME,
  },
  confirmacion: {
    type: DataTypes.BOOLEAN,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

export default TypeAgendamiento;
