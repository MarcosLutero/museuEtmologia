import express from 'express';
import cors from 'cors';
import initdb from './database/initdb.js';


const app = express();
app.use(cors());
app.use(express.json());;

const main = async () => {
  await initdb();    
  moment.locale('pt-BR');
  app.listen(3001, () => {
        console.log("Serve Run");
    });
}
main();