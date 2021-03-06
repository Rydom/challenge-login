import express from 'express';
import cors from 'cors'
import SequelizeDB from './lib/SequelizeDB'

const app = express();

app.use(cors());

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

require('dotenv/config')

const database = new SequelizeDB();
database.connect();

import indexRoute from "./routes/index"

app.use("/", indexRoute);

app.listen(process.env.PORT, (err) => {
    if(!err) {
        console.log(`Server listening on port: ${process.env.PORT}`);
    } else {
        console.error(err);
    }
})