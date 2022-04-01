import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Caracteristica = sequelize.define(
  "Caracteristica",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    paranoid: true,
    tableName: "caracteristica",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Caracteristica;
