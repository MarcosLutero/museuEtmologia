import express from 'express';
import cors from 'cors';
import initdb from './database/initdb.js';
import moment from 'moment';
import authenticate from './middlewares/authenticate';
import Routers from './routers/index.js';



const app = express();
app.use(cors());
app.use(express.json());;
app.use(authenticate());
app.use(...Routers);

(async () => {
  await initdb();    
  moment.locale('pt-BR');
  app.listen(5000, () => {
        console.log("Rodando na Porta 5000");
    });
})();