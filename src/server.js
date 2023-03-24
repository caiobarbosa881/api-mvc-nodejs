'use strict';

const express = require("express");
const app = express();
const db = require("./database/db");

const routes = require("./routes/routes")

app.use(express.json());

app.use("/", routes);

db.sync().then(() => { console.log("A conexão com o banco de dados foi um sucesso.")}).catch((error) => console.log(error));

const port = 3001 || 3333;
app.listen(port, () => {
    console.log("Porta rodando na: " + port);
});

module.exports = app;