import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Atributo = sequelize.define(
  "Atributo",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "atributo",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Atributo;
