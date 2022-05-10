import express, { query } from "express";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import Taxonomia from "../models/museu/Taxonomia";

const taxonomiaRouter = express.Router();

taxonomiaRouter.get("/taxonomia/", (req, res) => {
  Taxonomia.findAll({
    include: {
      model: Denominacao,
    },
  }).then((taxonomia) => {
    res.send({
      headers: ["Nome", "Denominacao"],
      rows: taxonomia.map((taxonomia) => ({
        id: taxonomia.id,
        columns: [taxonomia.nome, taxonomia.Denominacao?.denominacao],
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
    ],include:{
      model: Denominacao,
      attributes:[
        ['id', 'value'],
        ['denominacao', 'label']
      ]
    }
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
    attributes: ["id", "nome", "DenominacaoId"],
    include: [
      {
        model: Caracteristica,
        attributes: ["id", "AtributoId"],
        through: {
          attributes: [],
        },
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
  Taxonomia.findByPk(req.params.id)
    .then(async (taxonomia) => {
      if (taxonomia) {
        const denominacao = await Denominacao.findByPk(req.body.DenominacaoId);
        taxonomia.update(req.body).then((taxonomia) => {
          if (taxonomia) {
            taxonomia
              .setCaracteristicas(
                req.body.Caracteristicas.map((c) => c.id).filter(
                  (c) => c || false
                )
              )
              .then(() => res.send(taxonomia))
              .catch((err) => {
                console.log(err);
                res.sendStatus(500);
              });
          } else {
            res.sendStatus(500);
          }
        });
      }
    })
    .catch((err) => res.sendStatus(500));
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

taxonomiaRouter.post("/taxonomia", (req, res) => {
  Taxonomia.create(req.body)
    .then((taxonomia) => {
      taxonomia
        .setCaracteristicas(
          req.body.Caracteristicas.map((c) => c.id).filter((c) => c || false)
        )
        .then(() => res.send(taxonomia));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
export default taxonomiaRouter;
