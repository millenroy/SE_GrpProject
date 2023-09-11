const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "example");
    console.log(decoded);
    const user = await User.findOne({
      where: {
        id: decoded.id,
        token: token,
      },
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch {
    res.status(401).send({
      error: "Please authenticate",
    });
  }
};
module.exports = auth;
