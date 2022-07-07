const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/orders');


router.get("/", OrderController.getOrders);


router.get("/:id", OrderController.getOrder);


router.post("/", OrderController.createOrder);


router.put("/:id", OrderController.updateOrder);


router.delete("/:id", OrderController.deleteOrder);


router.get("/get/totalsales", OrderController.getTotalSale);


router.get("/get/count", OrderController.getOrderCount);


router.get("/get/userorders/:userid", OrderController.getUserOrder);


module.exports = router;
