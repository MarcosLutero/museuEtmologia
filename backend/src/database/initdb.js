import MuseuSchema from "./museu";
import Atributo from "../models/museu/Atributo";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import FotoTaxonomia from "../models/museu/FotoTaxonomia";
import FotoCaracteristica from "../models/museu/FotoCaracteristica";
import Taxonomia from "../models/museu/Taxonomia";
import CaracteristicaTaxonomia from "../models/museu/CaracteristicaTaxonomia";

const initdb = () =>
  new Promise((resolve, reject) => {
    
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

    Taxonomia.belongsTo(Taxonomia, {
      as: "Pai",
      onDelete: "RESTRICT",
      foreignKey: {
        name: "taxonomia_id",
        allowNull: true,
      },
    });

    Taxonomia.hasMany(Taxonomia, {
      as: "Filhos",
      onDelete: "RESTRICT",
      foreignKey: {
        name: "taxonomia_id",
        allowNull: true,
      },
    });

    
    Taxonomia.hasMany(FotoTaxonomia, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    FotoTaxonomia.belongsTo(Taxonomia, {
      onDelete: "RESTRICT",
      foreignKey: {
        allowNull: false,
      },
    });

       
    Caracteristica.hasMany(FotoCaracteristica, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    FotoCaracteristica.belongsTo(Caracteristica, {
      onDelete: "RESTRICT",
      foreignKey: {
        allowNull: false,
      },
    });

    Caracteristica.belongsToMany(Taxonomia, {
      through: CaracteristicaTaxonomia,
    });
    Taxonomia.belongsToMany(Caracteristica, {
      through: CaracteristicaTaxonomia,
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