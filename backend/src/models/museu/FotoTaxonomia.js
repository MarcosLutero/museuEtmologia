import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const FotoTaxonomia = sequelize.define(
  "FotoTaxonomia",
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
    tableName: "fotoTaxonomia",
    name: {
      plural: "FotoTaxonomias"
    },
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default FotoTaxonomia;
