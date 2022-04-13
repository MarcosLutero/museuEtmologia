import express from "express";
import sequelize from "../database/museu";
import md5 from "md5";
import JWT from "jsonwebtoken";
import Usuario from "../models/museu/Usuario";
import { Op } from "sequelize";

const usuarioRouter = express.Router();

usuarioRouter.get("/usuario/", (req, res) => {
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

  Usuario.findAndCountAll({
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
      headers: [
        { title: "Nome", order: "nome" },
        { title: "Login", order: "login" },
      ],
      count: result.count,
      rows: result.rows.map((usuario) => ({
        values: [usuario.nome, usuario.login],
        actions: [
          {
            id: usuario.id,
            name: "edit",

            //Exigido pelo Datatable
            icon: "faPencilAlt",
            title: "Editar",
            variant: "outline-info",
          },
          {
            id: usuario.id,
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

usuarioRouter.post("/usuario/login", (req, res) => {
  Usuario.findOne({
    where: { 
      login: req.body.login, 
      senha: md5(req.body.senha)
    },
  })
    .then(async (usuario) => {
      if (usuario) {
        const token = JWT.sign(
          {
            login: usuario.login,
            senha: usuario.senha,
          },
          "12345",
          {
            algorithm: "HS256",
            expiresIn: 600,
          }
        );
        res.send({
          login: usuario.login,
          nome: usuario.nome,
          token: token
        });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.toString());
    });
});

usuarioRouter.post("/usuario", async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const loginRepetido = await Usuario.findOne({
      where: { login: req.body.login },
      transaction,
    });
    if (loginRepetido) {
      res.sendStatus(409).end();
    } else {
      await Usuario.create(
        { ...req.body, senha: md5(req.body.senha) },
        { transaction }
      );
      await transaction.commit();
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    if (transaction) await transaction.rollback();
    res.sendStatus(500).end();
  }
});

usuarioRouter.delete("/usuario/:id", (req, res) => {
  Usuario.findByPk(req.params.id)
    .then((usuario) => {
      if (usuario) {
        usuario.destroy().then((result) => {
          if (result) res.sendStatus(200);
          else {
            res.sendStatus(500).end();
          }
        });
      } else {
        res.sendStatus(404).end();
      }
    })
    .catch(() => {
      res.sendStatus(500).end();
    });
});

export default usuarioRouter;
