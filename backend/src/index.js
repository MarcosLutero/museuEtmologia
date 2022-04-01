import express from 'express';
import cors from 'cors';
import initdb from './database/initdb.js';
import moment from 'moment';


const app = express();
app.use(cors());
app.use(express.json());;

(async () => {
  await initdb();    
  moment.locale('pt-BR');
  app.listen(5000, () => {
        console.log("Serve Run");
    });
})();