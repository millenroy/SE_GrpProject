'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      tollPlazaName: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      transactionID: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('payments');
  }
};