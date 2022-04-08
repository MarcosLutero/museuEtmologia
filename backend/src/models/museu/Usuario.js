import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "usuario",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Usuario;
