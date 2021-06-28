'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Atores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idautor: {
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      aniversario: {
        type: Sequelize.DATE
      },
      area: {
        type: Sequelize.STRING
      },
      popularidade: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Atores');
  }
};