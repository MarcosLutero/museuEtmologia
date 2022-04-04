import express, { query } from "express";
import { Op } from "sequelize";
import Denominacao from "../models/museu/Denominacao";
import Taxonomia from "../models/museu/Taxonomia";

const taxonomiaRouter = express.Router();

taxonomiaRouter.get("/taxonomia/", (req, res) => {
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

  Taxonomia.findAndCountAll({
    where: {
      [Op.and]: {
        ...queryFilter,
      },
    },
    include: {
      model: Denominacao,
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
        { title: "Denominacao", order: "Denominacao.denominacao" },
      ],
      count: result.count,
      rows: result.rows.map((taxonomia) => ({
        values: [taxonomia.nome, taxonomia.Denominacao.denominacao],
        actions: [
          {
            id: taxonomia.id,
            name: "edit",

            //Exigido pelo Datatable
            icon: "faPencilAlt",
            title: "Editar",
            variant: "outline-info",
          },
          {
            id: taxonomia.id,
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

taxonomiaRouter.get("/taxonomia/:id", (req, res) => {
  Taxonomia.findByPk(req.params.id, {})
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
            res.sendStatus(200);
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
      Promise.all([
        taxonomia.setDenominacao(req.body.Denominacao),
      ])
        .then(() => res.send(taxonomia))
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(() => {
      res.sendStatus(500, "error");
    });
});
export default taxonomiaRouter;
