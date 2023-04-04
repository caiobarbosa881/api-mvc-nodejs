# api-mvc-nodejs

API CRUD HTTP/JSON nodejs simples, utilizando o padrão de arquitetura MVC.

Significa que nossa aplicação vai ser uma API ou Application Programming Interface (Interface de Programação de Aplicação).

Ela vai utilizar o protocolo de comunicação HTTP(Hypertext Transfer Protocol).

A aplicação vai retornar JSON (JavaScript Object Notation) que é um formato de dados leve e fácil de ler e escrever. Ele é usado para armazenar e transmitir informações estruturadas entre aplicativos. Ele consiste em uma coleção de pares chave-valor e é frequentemente usado em aplicativos da web e móveis.

## Como Rodar o Projeto
Execute os comandos abaixo em sequência.

    -npm install
    -npm run dev

O primeiro comando npm install é responsável por instalar o projeto, já o npm run dev roda o projeto.

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

Podemos notar que ditamos como ela vai ser em nossa aplicação, Isso significa que no banco de dados vai ter uma tabela com os atributos exatamente específicados acima(userId, name, email, age).

## Controller

O controller é responsável por receber as solicitações do usuário, decidir o que fazer com elas e, em seguida, chama o modelo apropriado para realizar a tarefa necessária. Depois que o modelo processa a solicitação, o controller é responsável por coletar os resultados.

Resumindo: O controller é o componente que controla o fluxo da aplicação.

Esse Controller abaixo vai ser o addUserController, responsável por adicionar novos Users.

Vou utilizar o Model User citado anteriomente e receber a soliticação de adicionar um novo usuário, importando ele para o controller.
```javascript

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
            return res.status(201).json({ mensagem: "Usuário criado com sucesso!!!" });
        }
    }

    return res.status(409).json({ mensagem: "O email inserido já é utilizado."});
};

module.exports = {
    addUser
}

```

## View

AVISO: Nessa aplicação nós não utilizamos a view, porém ela poderia ser utilizada para mandar uma imagem com error 404 ao front-end.

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

Para utilizar a View seriam necessárias configurações no server.js, instalação de dependências como EJS e um controller retornar esse HTML que se encontra na View.

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

Utilizamos um banco de dados integrado na própria aplicação sendo o SQLITE, com ele um arquivo é criado dentro da própria aplicação onde os dados serão armazenados.

## Testes
Você pode executar testes com esse comando abaixo:

    npm test

a dependências jest e supertest auxiliam no teste das rotas da api criada.

os testes servem para melhor o desenvolvimento e tornar a aplicação mais consistente e previsível, adiantando cenários que podem ocorrer e no processo descobrindo coisas novas como erros não notados durante a criação do software.
## Dependências
São necessárias para o projeto funcionar corretamente.

    Express
    Sequelize
    Sqlite3

## Dependências de Desenvolvimento
Essas são todas as dependências que ficam apenas quando desenvolvendo e não vão para a versão final do aplicativo pelo fato de não forem necessárias na versão final.

    Jest
    Supertest

## Deploy

Você pode fazer o deploy( colocar a aplicação no ar ) dessa API, atualmente temos algumas alternativas que você pode tentar utilizar:

    Render
    AWS Lambda
    Google Cloud Platform (GCP)
    Microsoft Azure
    DigitalOcean
    IBM Cloud
    Zeit Now
    Heroku
    Netlify
    Glitch

AVISO: A documentação está listando as opções de deploy funcionando apenas no momento que foram listadas, e podem se tornar desatualizadas a qualquer momento no futuro.

## .gitignore

Ele é um arquivo responsável por listar o que deve ser ignorado e não ir para o repositório online ao dar um commit, um exemplo é a pasta node_modules que ao utilizar o comando npm install já seria possível ter ela no projeto sem precisar colocar no repositório online.

Você pode também colocar arquivos que possam conter dados da sua máquina como variáveis de ambiente.

## Autores
[@Caio Barbosa](https://www.github.com/caiobarbosa881)
