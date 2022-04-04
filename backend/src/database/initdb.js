import MuseuSchema from "./museu";
import Atributo from "../models/museu/Atributo";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import Especime from "../models/museu/Especime";
import Foto from "../models/museu/Foto";
import Taxonomia from "../models/museu/Taxonomia";
import Taxonomia_Especime from "../models/museu/Taxonomia_Especime";
import Caracteristica_Taxonomia from "../models/museu/Caracteristica_Taxonomia";

const initdb = () =>
  new Promise((resolve, reject) => {
    Denominacao.hasMany(Denominacao, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
      },
    });
    Denominacao.belongsTo(Denominacao, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
      },
    });
    Denominacao.hasMany(Taxonomia, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    Taxonomia.belongsTo(Denominacao, {
      onDelete: "RESTRICT",
      foreignKey: {
        allowNull: false,
      },
    });
    Taxonomia.belongsToMany(Especime, {
      through: Taxonomia_Especime,
    });
    Especime.belongsToMany(Taxonomia, {
      through: Taxonomia_Especime,
    });
    Especime.hasMany(Foto, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    Foto.belongsTo(Especime, {
      onDelete: "RESTRICT",
      foreignKey: {
        allowNull: false,
      },
    });
    Caracteristica.belongsToMany(Taxonomia, {
      through: Caracteristica_Taxonomia,
    });
    Taxonomia.belongsToMany(Caracteristica, {
      through: Caracteristica_Taxonomia,
    });
    Atributo.hasMany(Caracteristica, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    Caracteristica.belongsTo(Atributo, {
      onDelete: "RESTRICT",
      foreignKey: {
        allowNull: false,
      },
    });
    const syncModels = async () => {
      await MuseuSchema.sync();
    };
    //resolve();
    syncModels()
      .then(() => resolve())
      .catch((err) => reject(err));
  });

export default initdb;