import express from "express";
import Denominacao from "../models/museu/Denominacao";
import Taxonomia from "../models/museu/Taxonomia";
import sequelize from '../database/museu';

const denominacaoRouter = express.Router();
denominacaoRouter.get("/denominacao", (req, res) => {
  Denominacao.findAll({
    include: [{ model: Denominacao, as: "Pai" }, { model: Taxonomia }],
  }).then((denominacao) => {
    res.send({
      headers: ["Denominação", "Pertence a", "Nomes"],
      rows: denominacao.map((denominacao) => ({
        id: denominacao.id,
        columns: [
          denominacao.denominacao,
          denominacao.Pai?.denominacao,
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
  Denominacao.findByPk(req.params.id, {
    include: {
      model: Taxonomia,
      attributes: ["id", "nome"],
    },
  })
    .then((denominacao) => {
      if (denominacao) res.send(denominacao);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

denominacaoRouter.post("/denominacao", (req, res) => {
  Denominacao.create(req.body)
    .then((denominacao) => {
      Promise.all(
        res.body.Taxonomias.map((taxonomia) =>
          Taxonomia.create({
            ...taxonomia,
            DenominacaoId: denominacao.id,
          })
        )
      )
        .then(() => {
          res.send(denominacao);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(() => {
      res.sendStatus(500, "error");
    });
});

denominacaoRouter.put("/denominacao/:id", (req, res) => {
  Denominacao.findByPk(req.params.id, {include: Taxonomia})
    .then( async (denominacao) => {
      if (denominacao) {
        const transaction = await sequelize.transaction();
        try {
          await Promise.all([
            ...denominacao.Taxonomias.map((taxonomia)=>{
              if(
                !req.body.Taxonomias.find(
                  (t)=>t.id === taxonomia.id
                  )){
                return taxonomia.destroy({ transaction });
              }
            }),
            ...req.body.Taxonomias.map((taxonomia)=>{
              if(!taxonomia.id){
                return Taxonomia.create({
                  ...taxonomia,
                  DenominacaoId: denominacao.id,
              });
            }
            })
          ])
          await denominacao.update(req.body, { transaction });
          await transaction.commit();
          res.send(denominacao);
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
