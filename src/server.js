const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/User");

const routes = require("./routes/routes")

app.use(express.json());

app.use(express.static(path.join(__dirname + "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use("/", routes);

(async () => {
    const database = require('../src/database/db');
    const User = require('./models/User');
 
    try {
        const resultado = await database.sync();
        console.log("A conexão com o banco de dados foi um sucesso.");
    } catch (error) {
        console.log(error);
    }
})();


const port = 3000 || 3333;
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
