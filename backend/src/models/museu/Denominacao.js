import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Denominacao = sequelize.define(
  "Denominacao",
  {
    denominacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "denominacao",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Denominacao;
