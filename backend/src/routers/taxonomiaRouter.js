import express from "express";
import FotoTaxonomia from "../models/museu/FotoTaxonomia";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import Atributo from "../models/museu/Atributo";
import Taxonomia from "../models/museu/Taxonomia";
import { Op } from "sequelize";

const taxonomiaRouter = express.Router();

taxonomiaRouter.get("/respostaTaxonomia/", (req, res) => {
  Taxonomia.findAll({
    where: {
      nome: {
        [Op.like]: `%${req.query.filter}%`,
      },
    },
    attributes: ["nome"],
    include: [
      { model: Taxonomia, as: "Pai", attributes: ["nome"]},
      { model: Denominacao, attributes: ["nome"] },
      { model: FotoTaxonomia, attributes: ["nome", "conteudo"] },
      {
        model: Caracteristica,
        attributes: ["nome", "descricao"],
        through: {
          attributes: [],
        },
        include: {
          model: Atributo,
          attributes: ["nome", "identificacao"],
        },
      },
    ],
  }).then((taxonomia) => {
    {
      res.send(taxonomia);
    }
  });
});

taxonomiaRouter.get("/taxonomia/", (req, res) => {
  Taxonomia.findAll({
    include: [
      { model: Taxonomia, as: "Pai" },
      { model: Denominacao, attributes: ["nome"] },
    ],
  }).then((taxonomia) => {
    res.send({
      headers: ["Nome", "Pertence a", "Denominação"],
      rows: taxonomia.map((taxonomia) => ({
        id: taxonomia.id,
        columns: [
          taxonomia.nome,
          taxonomia.Pai?.nome ?? "(Raiz)",
          taxonomia.Denominacao.nome,
        ],
        actions: ["Editar", "Excluir"],
      })),
    });
  });
});

taxonomiaRouter.get("/taxonomia/options", (req, res) => {
  Taxonomia.findAll({
    attributes: [
      ["id", "value"],
      ["nome", "label"],
    ],
  })
    .then((options) => {
      res.send(options);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

taxonomiaRouter.get("/taxonomia/:id", (req, res) => {
  Taxonomia.findByPk(req.params.id, {
    attributes: ["id", "nome", "DenominacaoId", "taxonomia_id"],
    include: [
      {
        model: Caracteristica,
        attributes: ["id", "nome", "AtributoId"],
        through: {
          attributes: [],
        },
      },
      {
        model: FotoTaxonomia,
        attributes: ["id", "nome", "conteudo"],
      },
    ],
  })
    .then((taxonomia) => {
      if (taxonomia) {
        res.send(taxonomia);
      } else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

taxonomiaRouter.put("/taxonomia/:id", (req, res) => {
  Taxonomia.findByPk(req.params.id, { include: FotoTaxonomia })
    .then(async (taxonomia) => {
      if (taxonomia) {
        const denominacao = await Denominacao.findByPk(req.body.DenominacaoId);

        await taxonomia.setCaracteristicas(
          req.body.Caracteristicas.map((c) => c.id).filter((c) => c || false)
        );
        await Promise.all([
          ...taxonomia.FotoTaxonomias.map((fotoTaxonomiaAtual) => {
            if (
              !req.body.FotoTaxonomias.find(
                (foto) => foto.id === fotoTaxonomiaAtual.id
              )
            ) {
              return fotoTaxonomiaAtual.destroy();
            } else {
              return null;
            }
          }),
          ...req.body.FotoTaxonomias.map((fotoTaxonomiaNova) => {
            if (!fotoTaxonomiaNova.id) {
              return FotoTaxonomia.create({
                ...fotoTaxonomiaNova,
                TaxonomiumId: taxonomia.id,
              });
            } else {
              return null;
            }
          }),
        ]);
        await taxonomia.update(req.body);
        res.send(taxonomia);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

taxonomiaRouter.delete("/taxonomia/:id", (req, res) => {
  Taxonomia.findByPk(req.params.id)
    .then((taxonomia) => {
      taxonomia.destroy().then((result) => {
        if (result) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

taxonomiaRouter.post("/taxonomia", async (req, res) => {
  Taxonomia.create(req.body, { include: { model: FotoTaxonomia } })
    .then(async (taxonomia) => {
      await taxonomia.setCaracteristicas(
        req.body.Caracteristicas.map((c) => c.id).filter((c) => c || false)
      );
      await Promise.all(
        req.body.FotoTaxonomias.map((fotoTaxonomia) =>
          FotoTaxonomia.create({ ...fotoTaxonomia, TaxonomiumId: taxonomia.id })
        )
      );
      res.send(taxonomia);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
export default taxonomiaRouter;
