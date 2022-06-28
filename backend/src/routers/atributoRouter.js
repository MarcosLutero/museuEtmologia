import express from "express";
import Atributo from "../models/museu/Atributo";
import Caracteristica from "../models/museu/Caracteristica";
import FotoCaracteristica from "../models/museu/FotoCaracteristica";
import sequelize from "../database/museu";
import { Op } from "sequelize";

const atributoRouter = express.Router();
atributoRouter.get("/respostaAtributoCaracteristica/", (req, res) => {
  Atributo.findAll({
    where: {
      nome: {
        [Op.like]: `%${req.query.filter}%`,
      },
    },attributes: ["nome"],
    include: [
      { model: Caracteristica, attributes: ["nome", "descricao"],
      include: {
        model: FotoCaracteristica,
        attributes: [ "conteudo"],
      },
      }
    ]
  }).then((atributo) => {
    res.send(atributo);
  });
});

atributoRouter.get("/atributoCaracteristica/", (req, res) => {
  Atributo.findAll({
    include: [{ model: Caracteristica }],
    order: sequelize.literal("nome", "ASC"),
  }).then((atributo) => {
    res.send({
      headers: ["Nome", "Identificação", "Nome da Caracteristica"],
      rows: atributo.map((atributo) => ({
        id: atributo.id,
        columns: [
          atributo.nome,
          atributo.identificacao,
          atributo.Caracteristicas.map(
            (caracteristicas) => caracteristicas.nome
          ).join("; "),
        ],
        actions: ["Editar", "Excluir"],
      })),
    });
  });
});

atributoRouter.get("/atributoCaracteristica/options", (req, res) => {
  Atributo.findAll({
    attributes: [
      ["id", "value"],
      ["nome", "label"],
    ],
    include: {
      model: Caracteristica,
      attributes: [
        ["id", "value"],
        ["nome", "label"],
      ],
    },
  })
    .then((options) => {
      res.send(options);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

atributoRouter.get("/atributoCaracteristica/:id", (req, res) => {
  Atributo.findByPk(req.params.id, {
    include: [
      {
        model: Caracteristica,
        atributes: ["nome", "descricao"],
        include: {
          model: FotoCaracteristica,
          attributes: ["id", "nome", "conteudo"],
         
        },
      },
    ],
  })
    .then((atributo) => {
      if (atributo) res.send(atributo);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

atributoRouter.post("/atributoCaracteristica", (req, res) => {
  Atributo.create(req.body,{ include: { model: FotoCaracteristica }})
    .then((atributo) => {
      Promise.all([
        req.body.Caracteristicas.map((caracteristica) =>
          Caracteristica.create({
            ...caracteristica,
            AtributoId: atributo.id,
          })
        ),
        req.body.FotoCaracteristica.map((fotoCaracteristica) =>
        FotoCaracteristica.create({ ...fotoCaracteristica, TaxonomiumId: taxonomia.id })
      )
        ])
        .then(() => {
          res.send(atributo);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

atributoRouter.put("/atributoCaracteristica/:id", (req, res) => {
  Atributo.findByPk(req.params.id, { include: Caracteristica })
    .then(async (atributo) => {
      if (atributo) {
        const transaction = await sequelize.transaction();
        try {
          await Promise.all([
            ...atributo.Caracteristicas.map((caracteristica) => {
              if (
                !req.body.Caracteristicas.find(
                  (c) => c.id === caracteristica.id
                )
              ) {
                return caracteristica.destroy({ transaction });
              }
            }),
            ...req.body.Caracteristicas.map((caracteristica) => {
              if (!caracteristica.id) {
                return Caracteristica.create(
                  {
                    ...caracteristica,
                    AtributoId: atributo.id,
                  },
                  { transaction }
                );
              } else {
                return Caracteristica.findByPk(caracteristica.id, {
                  transaction,
                }).then((c) => c.update(caracteristica, { transaction }));
              }
            }),
          ]);

          await atributo.update(req.body, { transaction });
          await transaction.commit();
          res.send(atributo);
        } catch (err) {
          console.log(err);
          if (transaction) transaction.rollback();
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

atributoRouter.delete("/atributoCaracteristica/:id", (req, res) => {
  Atributo.findByPk(req.params.id)
    .then((atributo) => {
      if (atributo) {
        atributo.destroy().then((result) => {
          if (result) res.sendStatus(200);
          else {
            res.sendStatus(500);
          }
        });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

export default atributoRouter;
