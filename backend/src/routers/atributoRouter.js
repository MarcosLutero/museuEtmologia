import express from "express";
import Atributo from "../models/museu/Atributo";
import Caracteristicas from "../models/museu/Caracteristica";

const atributoRouter = express.Router();
atributoRouter.get("/atributoCaracteristica/", (req, res) => {
  Atributo.findAll({
    include: [{ model: Caracteristicas }],
  }).then((atributo) => {
    res.send({
      headers: ["Nome", "Identificação", "Nome da Caracteristica", ],
      rows: atributo.map((atributo) => ({
        id: atributo.id,
        columns: [
          atributo.nome,
          atributo.identificacao,
          atributo.Caracteristicas.map(
            (caracteristicas) => caracteristicas.nome
          ).join("; "),
        ],
        actions: ["Editar", "Excluir"],
      })),
    });
  });
});


atributoRouter.get("/atributoCaracteristica/:id", (req, res) => {
  Atributo.findByPk(req.params.id,{
    include:[{
      model: Caracteristicas,
      atributes:["nome", "descricao"]
    }]
  })
    .then((atributo) => {
      if (atributo) res.send(atributo);
      else res.sendStatus(404);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});


atributoRouter.post("/atributoCaracteristica", (req, res) => {
  Atributo.create(req.body).then( async atributo => {
      Promise.all(res.body.Caracteristicas.map(caracteristica=>Caracteristicas.create({
        Nome: caracteristica.nome, Descricao: caracteristica.descricao})
        ))
        .then(()=>res.send(atributo))
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
      });
    })
    .catch(err=>{
      console.log(err);
      res.sendStatus(500);
    });
  }
);


atributoRouter.put("/atributoCaracteristica/:id", (req, res) => {
  Atributo.findByPk(req.params.id, {include: Caracteristicas})
    .then( async atributo => {
      if (atributo) {
        const transaction = await sequelize.transaction();
        try {

          await Promise.all([
            ...atributo.Caracteristicas.map(caracteristica=>{
              if(!req.body.Caracteristicas.find(c=> c.id===caracteristica.id)){
                return caracteristica.destroy({transaction})
              }
            }),
            ...req.body.Caracteristicas.map(caracteristica=>{
              if(!caracteristica.id){
                return Caracteristicas.create({Nome: caracteristica.nome, Descricao: caracteristica.descricao})
              }
            })]);

        await atributo.update(req.body, {transaction});
        await transaction.commit();
        res.send(atributo)
        }
        catch(err){
          console.log(err);
          if(transaction) transaction.rollbavk();
          res.sendStatus(500);
        }}else{
         res.sendStatus(404); 
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
});

atributoRouter.delete("/atributoCaracteristica/:id", (req, res) => {
  Atributo.findByPk(req.params.id)
    .then(atributo => {
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
