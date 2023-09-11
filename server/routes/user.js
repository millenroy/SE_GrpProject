const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const { QueryTypes } = require('sequelize');
const sequelize = require('../db/db')
const router = new express.Router();
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      throw new Error("User not registered");
    }
    const isValid = await user.validPassword(req.body.password);
    if (!isValid) {
      return res.send({ error: "wrong password" });
    }
    await user.generateAuthToken();
    res.send(user);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});


router.post("/signup", async (req, res) => {
  try {
    if (req.body.role === "employee") {
      const user = await User.create(req.body);
      await user.generateAuthToken();
      //send username and password to user
      return res.send(user);
    }
    const user = await User.create(req.body);
    await user.generateAuthToken();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.post("/forgotPassword", async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      throw new Error("user not registered");
    }
    // console.log(user)
    // const jwt_secret = 'secret' + user.password
    // const payload = {
    //   email: user.email,
    //   id: user.id
    // }
    // const token = jwt.sign(
    //   payload,
    //   jwt_secret,
    //   {expiresIn: '10m'}
    // );
    // const link = `http://localhost:3000/resetPassword/${user.id}/${token}`
    const OTP = "1234";
    const mailOptions = {
      from: "node-test-45@outlook.com",
      to: `${user.email}`,
      subject: "ResetPassword",
      text: `Your OTP is ${OTP}`,
    };
    const result = await sendMail(mailOptions);
    if (result) {
      res.send({ user: user, message: "OTP sent to your email" });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/verifyOTP", (req, res) => {
  if (req.body.otp === "1234") {
    res.sendStatus(200);
  }
  res.sendStatus(404);
});
router.post("/resetPassword/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("Error");
    }
    // const jwt_secret = 'secret' + user.password
    // const payload = jwt.verify(token, jwt_secret)
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.send({ message: "password changed successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/logout", auth, async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.send({
    message: "Logged out",
  });
});

router.get("/listUsers", auth, async (req, res) => {
  console.log(req.user.role)
  try {
      if(req.user.role === 'admin'){
      const users = await User.findAll({where: {role: "user"}});
      res.send(users);
      }else{
        throw new Error('Failed')
      }
  } catch (error) {
      res.status(400).send({
          error: error.message
      });
  }
});

router.patch("/updateUser/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNo",
      "username",
      "vehicleType",
      "vehicleId"
  ];
  const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
      return res.status(400).send({
          error: "Invalid Updates"
      });
  }
  try {
      const user = await User.findOne({where:{id:req.params.id}});
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      if (!user) {
          return res.status(400).send();
      }
      res.send(user);
  } catch (error) {
      res.status(400).send({
          error: error.message
      });
  }
});

router.patch("/updateUser", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNo",
      "username",
      "vehicleType",
      "vehicleId"
  ];
  const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
      return res.status(400).send({
          error: "Invalid Updates"
      });
  }
  try {
      const user = await User.findOne({where:{id:req.user.id}});
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      if (!user) {
          return res.status(400).send();
      }
      res.send(user);
  } catch (error) {
      res.status(400).send({
          error: error.message
      });
  }
});

module.exports = router;
