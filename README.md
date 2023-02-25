# crud-mvc-nodejs
CRUD simples, utilizando o padrão de arquitetura MVC.

## Como Rodar o Projeto
Execute os comandos abaixo em sequência.

-npm install
<br>-npm run dev

## Arquitetura MVC

A aplicação foi criada seguindo a arquitetura MVC (Model-View-Controller).<br>
O objetivo principal do padrão MVC é separar as preocupações em camadas distintas, o que torna o código mais organizado e fácil de manter.

## Model

A Model em uma arquitetura MVC (Model-View-Controller) é responsável por lidar com a lógica de negócios e gerenciamento de dados do aplicativo.
Ela é a camada que representa o modelo de dados do aplicativo, definindo as estruturas de dados, regras de validação e manipulação de dados.

No exemplo abaixo vou modelar a entidade User, definindo como ela vai ser dentro da minha aplicação.

```javascript
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database/db");

const User = db.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = User;
```

Podemos notar que ditamos como ela vai ser em nossa aplicação.

## Controller

O controller é responsável por receber as solicitações do usuário, decidir o que fazer com elas e, em seguida, chama o modelo apropriado para realizar a tarefa necessária. Depois que o modelo processa a solicitação, o controller é responsável por coletar os resultados.

Resumindo: O controller é o componente que controla o fluxo da aplicação.

Esse Controller abaixo vai ser o addUserController, responsável por adicionar novos Users.

Vou utilizar o Model User citado anteriomente e receber a soliticação de adicionar um novo usuário, importando ele para o controller.
```javascript
const User = require("../models/User");

const addUser = async (req, res) => {
    const { name, email, age } = req.body;

    const userExist = await User.findOne({
        where: {
            email
        }
    });

    if (!userExist) {        
        if (name && email && age !== null) {
            const userCreated = await User.create({ name, email, age });
            return res.send("Usuário criado com sucesso!!!");
        }
    }

    return res.redirect("/?error=emailTaken");
};

module.exports = {
    addUser
}

```

## Aviso

O README está sendo implementado aos poucos e conteúdos adicionais vão ser adicionados.

## Autores
Caio Barbosa
