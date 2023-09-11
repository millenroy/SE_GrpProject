'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tollPlazas', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      nhNo: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      section: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('tollPlazas');
  }
};