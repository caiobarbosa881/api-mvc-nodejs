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

```
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

```

## Aviso

O README está sendo implementado aos poucos e conteúdos adicionais vão ser adicionados.

## Autores
Caio Barbosa
