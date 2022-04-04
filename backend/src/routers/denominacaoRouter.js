import express, { query } from "express";
import { Op } from "sequelize";
import Denominacao from "../models/museu/Denominacao";

const denominacaoRouter = express.Router();
denominacaoRouter.get("/denominacao", (req, res) => {
  const queryFilter = {};

  if (req.query.filter) {
    queryFilter[Op.or] = {
      denominacao: {
        [Op.like]: "%" + req.query.filter + "%",
      },
    };
  }
  const order = req.query.order
    ? req.query.dir
      ? [[...req.query.order.split("."), req.query.dir]]
      : [[...req.query.order.split(".")]]
    : undefined;

  Denominacao.findAndCountAll({
    where: {
      [Op.and]: {
        ...queryFilter,
      },
    },
    order: order,
    limit:
      parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : undefined,
    offset:
      parseInt(req.query.offset) > 0 ? parseInt(req.query.offset) : undefined,
  }).then((result) => {
    res.send({
      raw: result.rows,
      headers: [{ title: "Denominação", order: "denominação" }],
      count: result.count,
      rows: result.rows.map((denominacao) => ({
        values: [denominacao.denominacao],
        actions: [
          {
            id: denominacao.id,
            name: "edit",

            //Exigido pelo Datatable
            icon: "faPencilAlt",
            title: "Editar",
            variant: "outline-primary",
          },
          {
            id: denominacao.id,
            name: "delete",

            //Exigido pelo Datatable
            icon: "faTrash",
            title: "Excluir",
            variant: "outline-danger",
          },
        ],
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
