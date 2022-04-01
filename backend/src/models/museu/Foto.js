import { DataTypes } from "sequelize";
import sequelize from "../../database/museu.js";

const Foto = sequelize.define(
  "Foto",
  {
    arquivo: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    
  },
  {
    paranoid: true,
    tableName: "foto",
    underscored: true,
    freezeTableName: true,
    schema: "museu",
  }
);

export default Foto;
