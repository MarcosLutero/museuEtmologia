import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Atributo = sequelize.define(
  "Atributo",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identificacao:{
      type: DataTypes.ENUM('Descrição Morfológica', 'Descrição Biológica','Descrição Ecológica'),
      allowNull: false,
    }

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
