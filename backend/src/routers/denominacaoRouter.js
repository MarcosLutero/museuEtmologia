import express, { query } from "express";
import Denominacao from "../models/museu/Denominacao";

const denominacaoRouter = express.Router();
denominacaoRouter.get("/denominacao", (req, res) => {
  Denominacao.findAll({
    include:[{model: Denominacao, as: "Pai"},{model: Denominacao, as: "Filhos"}]
  }).then((denominacao) => {
    res.send({
      headers: [ "Denominação", "Denominação Pai", "Denominação Filhos"],
      rows: denominacao.map((denominacao) => ({
        id: denominacao.id,
        columns: [
          denominacao.denominacao,
          denominacao.Pai?.denominacao,
          denominacao.Filhos.map(filho=>filho.denominacao).join(", ")
        ],
        actions: ["Editar", "Excluir"],
      })),
    });
  });
  console.log(res.body);
});

denominacaoRouter.get("/denominacao/options", (req, res) => {
  Denominacao.findAll({
    attributes: [
      ["id", "value"],
      ["denominacao", "label"],
    ],
  })
    .then((options) => {
      res.send(options);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

denominacaoRouter.get("/denominacao/:id", (req, res) => {
  Denominacao.findByPk(req.params.id)
    .then((denominacao) => {
      if (denominacao) res.send(denominacao);
      else res.sendStatus(404);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

denominacaoRouter.post("/denominacao", (req, res) => {
  Denominacao.create(req.body)
    .then((denominacao) => {
      res.send(denominacao);
    })
    .catch(() => {
      res.sendStatus(500, "error");
    });
});

denominacaoRouter.put("/denominacao/:id", (req, res) => {
  Denominacao.findByPk(req.params.id)
    .then((denominacao) => {
      if (denominacao) {
        denominacao.update(req.body).then((result) => {
          if (result) res.sendStatus(200);
          else {
            res.sendStatus(500);
          }
        });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

denominacaoRouter.delete("/denominacao/:id", (req, res) => {
  Denominacao.findByPk(req.params.id)
    .then((denominacao) => {
      if (denominacao) {
        denominacao.destroy().then((result) => {
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

export default denominacaoRouter;
