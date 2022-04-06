import express, { query } from "express";
import { Op } from "sequelize";
import Denominacao from "../models/museu/Denominacao";
import Caracteristica from "../models/museu/Caracteristica";
import Atributo from "../models/museu/Atributo";
const caracteristicaRouter = express.Router();

caracteristicaRouter.get("/caracteristica/", (req, res) => {
  var queryFilter = {};
  if (req.query.filter) {
    queryFilter[Op.or] = {
      nome: {
        [Op.like]: "%" + req.query.filter + "%",
      },
    };
  }
  const order = req.query.order
    ? req.query.dir
      ? [[...req.query.order.split("."), req.query.dir]]
      : [[...req.query.order.split(".")]]
    : undefined;

  Caracteristica.findAndCountAll({
    where: {
      [Op.and]: {
        ...queryFilter,
      },
    },
    include: {
      model: Atributo,
    },
    order: order,
    limit:
      parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : undefined,
    offset:
      parseInt(req.query.offset) > 0 ? parseInt(req.query.offset) : undefined,
  }).then((result) => {
    res.send({
      raw: result.rows,
      headers: [
        { title: "Nome", order: "nome" },
        { title: "Descricao", order: "descricao" },
      ],
      count: result.count,
      rows: result.rows.map((caracteristica) => ({
        values: [caracteristica.nome, caracteristica.descricao],
        actions: [
          {
            id: caracteristica.id,
            name: "edit",

            //Exigido pelo Datatable
            icon: "faPencilAlt",
            title: "Editar",
            variant: "outline-info",
          },
          {
            id: caracteristica.id,
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
