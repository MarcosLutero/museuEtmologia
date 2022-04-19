import express, { query } from "express";
import { Op } from "sequelize";
import Denominacao from "../models/museu/Denominacao";
import Caracteristica from "../models/museu/Caracteristica";
import Atributo from "../models/museu/Atributo";
const caracteristicaRouter = express.Router();

caracteristicaRouter.get("/caracteristica/", (req, res) => {
  Caracteristica.findAll({
    include: {
      model: Atributo,
      attributes: ['nome']
    }
  }).then((caracteristicas) => {
    res.send({
      headers: ["Nome", "Descrição","Atributo"],
      rows: caracteristicas.map((caracteristica) => ({
        id: caracteristica.id,
        columns: [caracteristica.nome, caracteristica.descricao, caracteristica.Atributo.nome],
        actions: ["Editar","Excluir"],
      })),
    });
  });
});

caracteristicaRouter.get("/caracteristica/:id", (req, res) => {
  Caracteristica.findByPk(req.params.id, {})
    .then((caracteristica) => {
      if (caracteristica) {
        res.send(caracteristica);
      } else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

caracteristicaRouter.put("/caracteristica/:id", (req, res) => {
  Caracteristica.findByPk(req.params.id)
    .then(async (caracteristica) => {
      if (caracteristica) {
        const denominacao = await Denominacao.findByPk(req.body.DenominacaoId);
        caracteristica.update(req.body).then((caracteristica) => {
          if (caracteristica) {
            res.sendStatus(200);
          } else {
            res.sendStatus(500);
          }
        });
      }
    })
    .catch((err) => res.sendStatus(500));
});

caracteristicaRouter.delete("/caracteristica/:id", (req, res) => {
  Caracteristica.findByPk(req.params.id)
    .then((caracteristica) => {
      caracteristica.destroy().then((result) => {
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

caracteristicaRouter.post("/caracteristica", (req, res) => {
  Caracteristica.create(req.body)
  .then(caracteristica => {
    res.send(caracteristica);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});
export default caracteristicaRouter;
