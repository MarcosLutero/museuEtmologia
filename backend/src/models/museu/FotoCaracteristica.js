import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const FotoCaracteristica = sequelize.define(
  "FotoCaracteristica",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    conteudo: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "foto_caracteristica",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default FotoCaracteristica;
