import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Caracteristica_Taxonomia = sequelize.define(
  "Caracteristica_Taxonomia",
  {
  },
  {
    paranoid: true,
    tableName: "caracteristica_taxonomia",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Caracteristica_Taxonomia;
