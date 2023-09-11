const Sequelize = require("sequelize");
const sequelize = require("../db/db");
const TollPlaza = sequelize.define("TollPlaza", {
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
  }

});

module.exports = TollPlaza;
