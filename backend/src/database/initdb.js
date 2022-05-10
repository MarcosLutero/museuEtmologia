import MuseuSchema from "./museu";
import Atributo from "../models/museu/Atributo";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import Especime from "../models/museu/Especime";
import Foto from "../models/museu/Foto";
import Taxonomia from "../models/museu/Taxonomia";
import TaxonomiaEspecime from "../models/museu/TaxonomiaEspecime";
import CaracteristicaTaxonomia from "../models/museu/CaracteristicaTaxonomia";

const initdb = () =>
  new Promise((resolve, reject) => {
    Denominacao.hasMany(Denominacao, {
      as: "Filhos",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
      },
    });
    Denominacao.belongsTo(Denominacao, {
      as: "Pai",
      onDelete: "CASCADE",
      foreignKey: {
        name: "denominacao_id",
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
      through: TaxonomiaEspecime,
    });
    Especime.belongsToMany(Taxonomia, {
      through: TaxonomiaEspecime,
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