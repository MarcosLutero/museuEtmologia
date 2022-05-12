import express from "express";
import Denominacao from "../models/museu/Denominacao";
import Taxonomia from "../models/museu/Taxonomia";

const denominacaoRouter = express.Router();
denominacaoRouter.get("/denominacao/", (req, res) => {
  Denominacao.findAll({
    include: [{ model: Taxonomia }],
  }).then((denominacao) => {
    res.send({
      headers: ["Denominação", "Nomes"],
      rows: denominacao.map((denominacao) => ({
        id: denominacao.id,
        columns: [
          denominacao.nome,
          denominacao.Taxonomias.map((taxonomias) => taxonomias.nome).join(
            "; "
          ),
        ],
        actions: ["Editar", "Excluir"],
      })),
    });
  });
});

denominacaoRouter.get("/denominacao/options", (req, res) => {
  Denominacao.findAll({
    attributes: [["id", "value"], ["nome", "label"]]
  })
    .then((options) => {
      res.send(options);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

denominacaoRouter.get("/denominacao/:id", (req, res) => {
  Denominacao.findByPk(req.params.id, {
    include: {
      model: Taxonomia,
      attributes: ["id", "nome", "taxonomia_id"],
    },
  })
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
    .then((denominacao) => res.send(denominacao))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500, "error");
    });
});

denominacaoRouter.put("/denominacao/:id", (req, res) => {
  Denominacao.findByPk(req.params.id)
    .then((denominacao) => res.send(denominacao))
    .catch((err) => {
      console.log(err);
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
