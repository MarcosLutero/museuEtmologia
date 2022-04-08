import express, { query } from "express";
import { Op } from "sequelize";
import Atributo from "../models/museu/Atributo";

const atributoRouter = express.Router();
atributoRouter.get("/atributo", (req, res) => {
  const queryFilter = {};

  if (req.query.filter) {
    queryFilter[Op.or] = {
      atributo: {
        [Op.like]: "%" + req.query.filter + "%",
      },
    };
  }
  const order = req.query.order
    ? req.query.dir
      ? [[...req.query.order.split("."), req.query.dir]]
      : [[...req.query.order.split(".")]]
    : undefined;

  Atributo.findAndCountAll({
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
      headers: [{ title: "Atributo", order: "atributo" }],
      count: result.count,
      rows: result.rows.map((atributo) => ({
        values: [atributo.atributo],
        actions: [
          {
            id: atributo.id,
            name: "edit",

            //Exigido pelo Datatable
            icon: "faPencilAlt",
            title: "Editar",
            variant: "outline-primary",
          },
          {
            id: atributo.id,
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

atributoRouter.get("/atributo/options", (req, res) => {
  Atributo.findAll({
    attributes: [
      ["id", "value"],
      ["atributo", "label"],
    ],
  })
    .then((options) => {
      res.send(options);
    })
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

atributoRouter.get("/atributo/:id", (req, res) => {
  Atributo.findByPk(req.params.id)
    .then((atributo) => {
      if (atributo) res.send(atributo);
      else res.sendStatus(404);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

atributoRouter.post("/atributo", (req, res) => {
  Atributo.create(req.body)
    .then((atributo) => {
      res.send(atributo);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500, "error");
    });
});

atributoRouter.put("/atributo/:id", (req, res) => {
  Atributo.findByPk(req.params.id)
    .then((atributo) => {
      if (atributo) {
        atributo.update(req.body).then((result) => {
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

atributoRouter.delete("/atributo/:id", (req, res) => {
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
