import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Taxonomia = sequelize.define(
  "Taxonomia",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    name: {
      plural: 'Taxonomias'
    },
    tableName: "taxonomia",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Taxonomia;
