import { DataTypes } from "sequelize";
import db from "../../connect/connect";
const TypeEmpleado = db.define("empleado", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idEmpleado: {
    type: DataTypes.STRING,
  },
  cc: {
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  contraseña: {
    type: DataTypes.STRING,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  rol: {
    type: DataTypes.BOOLEAN,
  },
});

export default TypeEmpleado;
