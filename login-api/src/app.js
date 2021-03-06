import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors());

require('dotenv').config();


import indexRoute from "./routes/index"

app.use("/", indexRoute);

app.listen(process.env.PORT, (err) => {
    if(!err) {
        console.log(`Server listening on port: ${process.env.PORT}`);
    } else {
        console.error(err);
    }
})