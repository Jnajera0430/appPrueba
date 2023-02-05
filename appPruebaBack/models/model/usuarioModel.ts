import { DataTypes } from "sequelize";
import db from "../../connect/connect";
const TypeUsuarios = db.define("usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idUser: {
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

export default TypeUsuarios;
