const Sequelize = require("sequelize");
const sequelize = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payment = require("./payment")
const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: Sequelize.STRING(200),
  lastName: Sequelize.STRING(200),
  email: {
    type: Sequelize.STRING(300),
    unique: true,
    isEmail: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(300),
    unique: true,
    allowNull: false,
  },
  phoneNo: Sequelize.STRING(20),
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
    min: 6,
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
});

User.beforeCreate(async (user, options) => {
  console.log(user);
  const hashedPassword = await bcrypt.hash(user.password, 8);
  user.password = hashedPassword;
});

User.prototype.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
User.prototype.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      id: user.id,
    },
    "example"
  );
  user.token = token;
  await user.save();
};
Payment.belongsToMany(User, {
  through: "users_Payments",
  as: "users",
  foreignKey: "payment_id",
  constraints: false
});
// sequelize.sync({force: true})
module.exports = User;
