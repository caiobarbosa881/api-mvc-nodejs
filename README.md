# crud-mvc-nodejs
CRUD simples, utilizando o padrão de arquitetura MVC.

## Como Rodar o Projeto
Execute os comandos abaixo em sequência.

    -npm install
    -npm run dev

## Arquitetura MVC

A aplicação foi criada seguindo a arquitetura MVC (Model-View-Controller).<br>
O objetivo principal do padrão MVC é separar as preocupações em camadas distintas, o que torna o código mais organizado e fácil de manter.

<img src="https://arquivo.devmedia.com.br/artigos/Joel_Rodrigues/Guias/guia-aspnet-mvc-1.png" alt="Imagem representando arquitetura MVC">

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

## View

Ela exibe os dados que foram processados e organizados pelo Controller, para que o usuário possa interagir com a aplicação final.

A View é separada do modelo e do controlador, o que permite que cada componente seja alterado independentemente sem afetar os outros. Ela recebe dados do controlador e os apresenta em uma interface gráfica de usuário (GUI) apropriada para a plataforma.

View não deve conter lógica de negócios ou acesso direto aos dados do modelo, mas sim apresentar informações de forma clara e interativa para o usuário.

Nesse caso abaixo o back-end retorna uma imagem 404 para o front-end caso algo ocorra de forma errada nas rotas.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error 404</title>
</head>
<body>
    <img alt="erro 404" src="https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg">
</body>
</html>
```

## Banco de Dados

Nossa aplicação está utilizando um banco de dados relacional chamado SQLITE que é muito utilizado principamente na parte de desenvolvimento. Ele é incorporado na própria aplicação, pelo fato de ser um banco de dados embutido ele também é empregado para desenvolver aplicações em dispositivos móveis.

## ORM

O mapeamento objeto-relacional(ORM), é uma técnica para aproximar o paradigma de orientação a objetos ao paradigma do banco de dados relacional.

Nessa aplicação estamos utilizando o ORM Sequelize.
Podemos ver abaixo como o sequelize está trabalhando com o banco de dados relacional sqlite.
```javascript
'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './src/database/db.sqlite',
        define: {
            timestamps: true,
            freezeTableName: true
          },
    });

module.exports = sequelize;
```
## Banco de Dados

Utilizamos um banco de dados integrado na própria aplicação sendo o SQLITE.

## Dependências

    Express
    Sequelize
    Sqlite3

## Dependências de Desenvolvimento
    Jest
    Supertest
## Autores
[@Caio Barbosa](https://www.github.com/caiobarbosa881)
