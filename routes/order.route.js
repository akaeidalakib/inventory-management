const express = require("express");
const orderController = require("../controllers/order.controller");

const router = express.Router();
router.route("/init").post(orderController.createOrder)
router.route("/cashon").post(orderController.createOrderCashon)
router.route("/success").post(orderController.getSuccess)
router.route("/fail").post(orderController.getFail)
router.route("/cancel").post(orderController.getCancel)

// router.route("/ipn").post(orderController.getIpn)
router.route("/").get(orderController.getOrders)
router.route("/:id").get(orderController.getOrderById)
router.route("/:id").patch(orderController.updateOrderById)
router.route("/:id").delete(orderController.deleteOrderById)


module.exports = router;