import express from "express";
import Atributo from "../models/museu/Atributo";
import Caracteristica from "../models/museu/Caracteristica";
import Denominacao from "../models/museu/Denominacao";
import Especime from "../models/museu/Especime";
import Taxonomia from "../models/museu/Taxonomia";

const especimeRouter = express.Router();
especimeRouter.get("/especime", (req, res) => {
  Especime.findAll({
    include: [
      {
        model: Taxonomia,
        include: {
          model: Denominacao,
        },
      },
    ],
  }).then((especie) => {
    res.send({
      headers: ["Nome", "Descrição", "Denominação/Taxonomia"],
      rows: especie.map((especime) => ({
        id: especime.id,
        columns: [
          especime.nome,
          especime.descricao,
          especime.Taxonomias.map(
            (taxonomia) =>
              taxonomia.Denominacao.denominacao + ": " + taxonomia.nome
          ).join("; "),
        ],
        actions: ["Editar", "Excluir"],
      })),
    });
  });
});

especimeRouter.get("/especime/:id", (req, res) => {
  Especime.findByPk(req.params.id, {
    include: [
      {
        model: Taxonomia,
        attributes: ["nome"],
        through: { attributes: [] },
        order: [
          ["Denominacao", "DenominacaoId", "DESC"],
          ["Denominacao", "id", "ASC"],
        ],
        include: [
          {
            model: Denominacao,
            attributes: ["denominacao"],
          },
          {
            model: Caracteristica,
            attributes: ["nome", "descricao"],
            include: {
              model: Atributo,
              attributes: ["nome"],
            },
            through: { attributes: [] },
          },
        ],
      },
    ],
  })
    .then((especime) => {
      if (especime) {
        res.send(especime);
      } else {
        console.log(especime);
        res.sendStatus(404);
      }
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
    .catch((err) => {
      res.sendStatus(500);
    });
});

especimeRouter.post("/especime", (req, res) => {
  Especime.create(req.body)
    .then((especime) => {
      console.log(especime);
      especime
        .setTaxonomias(
          req.body.Taxonomias.map((t) => t.id).filter((t) => t || false)
        )
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
