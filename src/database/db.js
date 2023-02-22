const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './src/database/bd.sqlite',
        define: {
            timestamps: true,
            freezeTableName: true
          },
    });

module.exports = sequelize;