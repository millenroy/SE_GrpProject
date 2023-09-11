const Sequelize = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user");
const Payment = sequelize.define("Payment", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  transactionID: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  price: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
  tollPlazaName: {
    type: Sequelize.STRING(300),
    allowNull: false,
  }

});


module.exports = Payment;
