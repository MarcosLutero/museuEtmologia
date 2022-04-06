import express, { query } from "express";
import { Op } from "sequelize";
import Atributo from "../models/museu/Atributo";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import Especime from "../models/museu/Especime";
import Taxonomia from "../models/museu/Taxonomia";

const especimeRouter = express.Router();

especimeRouter.get("/especime", (req, res) => {
  const queryFilter = {};

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
  Especime.findAndCountAll({
    where: {
      [Op.and]: {
        ...queryFilter,
      },
    },
    order: order,
    attributes: ["id", "nome", "descricao"],
    include: [
      {
        model: Taxonomia,
        attributes: ["nome"],
        through: { attributes: [] },
        order: [
          ["Denominacao", "DenominacaoId", "DESC"],
          ["Denominacao", "id", "ASC"],
        ],
        include: {
          model: Denominacao,
          attributes: ["denominacao"],
        },
      },
    ],
    distinct: true,
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
        { title: "Taxonomia", order: "Taxonomia.nome" },
      ],
      count: result.count,
      rows: result.rows.map((especime) => ({
        values: [
          especime.nome,
          especime.descricao,
          especime.Taxonomias.map(
            (taxonomia) =>
              taxonomia.Denominacao.denominacao + ": " + taxonomia.nome
          ).join(", "),
        ],
        actions: [
          {
            id: especime.id,
            name: "edit",

            //Exigido pelo Datatable
            icon: "faPencilAlt",
            title: "Editar",
            variant: "outline-info",
          },
          {
            id: especime.id,
            name: "relatorio",

            //Exigido pelo Datatable
            icon: "faFile",
            title: "Relatório",
            variant: "outline-success",
          },
          {
            id: especime.id,
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

especimeRouter.get("/especime/:id", (req, res) => {
  Especime.findByPk(req.params.id, {
    attributes: ["id", "nome", "descricao"],
    include: [
      {
        model: Taxonomia,
        attributes: ["nome"],
        through: { attributes: [] },
        order: [
          ["Denominacao", "DenominacaoId", "DESC"],
          ["Denominacao", "id", "ASC"],
        ],
        include: [{
          model: Denominacao,
          attributes: ["denominacao"],
        },
        {
          model: Caracteristica,
          attributes:["nome", "descricao"],
          include: {
            model: Atributo,
            attributes:["nome"],
          },
          through: { attributes: [] },
        }]
      },
    ],
  })
    .then((especime) => {
      if (especime) res.send(especime);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

especimeRouter.put("/especime/:id", (req, res) => {
  Especime.findByPk(req.params.id)
    .then((especime) => {
      if (especime) {
        especime.update(req.body).then((especime) => {
          if (especime) {
            especime
              .setTaxonomias(req.body.Taxonomias)
              .then(() => res.send(especime))
              .catch((err) => {
                console.log(err);
                res.sendStatus(500);
              });
          } else res.sendStatus(500);
        });
      } else es.sendStatus(404);
    })
    .catch((err) => res.sendStatus(500));
});

especimeRouter.post("/especime", (req, res) => {
  Especime.create(req.body)
    .then((especime) => {
      console.log(especime);
      especime
        .setTaxonomias(req.body.Taxonomias)
        .then(() => res.send(especime))
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500, "error");
    });
});

export default especimeRouter;
