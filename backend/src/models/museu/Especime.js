import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Especime = sequelize.define(
  "Especime",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "especime",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Especime;
