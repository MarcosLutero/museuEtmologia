import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const TaxonomiaEspecime = sequelize.define(
  "TaxonomiaEspecime",{
    
  },{
    paranoid: true,
    tableName: "taxonomia_especime",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default TaxonomiaEspecime;
