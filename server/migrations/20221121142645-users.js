'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      } ,
      firstName: Sequelize.STRING(200),
      lastName: Sequelize.STRING(200),
      username: {
        type: Sequelize.STRING(300),
        unique: true,
        allowNull: false,
      },
      email: {
        type:Sequelize.STRING(300),
        unique: true,
        isEmail: true,
        allowNull: false
        },
      phoneNo: Sequelize.STRING(20),
      password: {
        type:Sequelize.STRING(100),
        allowNull: false,
        min: 6
      },
      role:  {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      vehicleType: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      vehicleId: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      token: Sequelize.STRING(300),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('users');
  }
};