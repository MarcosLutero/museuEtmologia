import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const CaracteristicaTaxonomia = sequelize.define(
  "CaracteristicaTaxonomia",
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

export default CaracteristicaTaxonomia;
