const express = require("express");
const auth = require("../middleware/auth");
const TollPlaza = require("../models/tollPlaza");
const Payment = require("../models/payment")
const sequelize = require('../db/db')
const { QueryTypes } = require('sequelize');
const router = new express.Router();

router.post("/createTollPlaza", auth, async (req, res) => {
  try {
    if (req.user.role === "user"){
      throw new Error("Unable to create TollPlaza")
    }
    console.log(req.body)
    const tollPlaza = await TollPlaza.create(req.body)
    console.log(tollPlaza)
    res.status(201).send(tollPlaza)
  } catch (error) {
    res.send(error)
  }
})

router.get("/getTollPlazas", auth, async (req, res) => {
  try {
    const tollPlazas = await TollPlaza.findAll();
    res.send(tollPlazas)
  } catch (error) {
    res.send(error)
  }
})
router.post("/getTollPlazaByName", auth, async (req, res) => {
  try {
    const {name} = req.body
    const tollPlaza = await TollPlaza.findOne({ where: { name } });
    res.send(tollPlaza)
  } catch (error) {
    res.send(error)
  }
})

router.patch("/tollPlazas/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates)
    const allowedUpdates = [
      "name",
      "location",
      "nhNo",
      "state",
      "section",
      "price"
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
    if(req.user.role === "user"){
      throw new Error("Error")
    }
    await TollPlaza.update(req.body, {where: {
      id: req.params.id
    },
  })
  const tollPlaza = await TollPlaza.findOne({where: {id: req.params.id}})
    console.log(tollPlaza)
    if (!tollPlaza) {
      return res.status(400).send();
    }
    res.send(tollPlaza);
  } catch (error) {
    res.status(400).send({
    error: error.message
    });
  }
})

router.delete("/tollPlazas/:id", auth, async (req, res) => {
  try {
    if(req.user.role === "user"){
      throw new Error("Error")
    }
    const tollPlaza = await TollPlaza.findOne({
      where: {
          id: req.params.id
      }
    })
    if(!tollPlaza){
      throw new Error("tollPlaza does not exist")
    }
    await TollPlaza.destroy({
      where: {
          id: req.params.id
      }
    })
    res.status(200).send('Deleted');
  } catch (error) {
    res.send(error.message)
  }

})
router.get("/payToll/:tollPlazaId", auth, async (req, res) => {
  try {
    console.log(req.body)

    const tollPlaza = await TollPlaza.findOne({ where: { id: req.params.tollPlazaId } });
    console.log(tollPlaza)
    let x = String(Math.floor((Math.random() * 1000000000) + 1));
    const paymentDetails = {
      price: tollPlaza.price,
      tollPlazaName: tollPlaza.name,
      transactionID: x
    }
    console.log(paymentDetails)
    const payment = await Payment.create(paymentDetails)
    console.log(payment)
    const users_payments =  await sequelize.query("INSERT INTO users_payments (createdAt, updatedAt, payment_id, userId) VALUES (:createdAt, :updatedAt,:paymentId,:userId)", {replacements: {
      createdAt:'2011-03-13 02:53:50',
      updatedAt: '2011-03-13 02:53:50',
      paymentId: payment.id,
      userId: req.user.id,
      
    }, type: QueryTypes.INSERT })
    console.log(users_payments)
    res.send(payment)
  } catch (error) {
    res.send(error)
  }
})

router.get("/showPaymentDetails", auth, async (req, res) => {
  try {
    console.log('test')
    const userId = req.user.id
    const payments = await sequelize.query("SELECT `users`.`firstName`, `users`.`lastName`, `users`.`email`, `users`.`vehicleId`,`payments`.`price`, `payments`.`tollPlazaName`, `payments`.`transactionID` FROM `users` JOIN `users_payments` on `users`.`id` = `users_payments`.`userId` JOIN `payments` on `payments`.`id` = `users_payments`.`payment_id` where `users`.`id` = ?", {  replacements: [userId],type: QueryTypes.SELECT })
    res.send(payments)
  } catch (error) {
    res.send(error)
  }
})


module.exports = router