import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Taxonomia_Especime = sequelize.define(
  "Taxonomia_Especime",{
  },{
    paranoid: true,
    tableName: "taxonomia_especime",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Taxonomia_Especime;
