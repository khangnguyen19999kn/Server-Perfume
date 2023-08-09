const express = require("express")
const {
	getAllOrder,
	createOrder,
	getOrderById,
	updateOrder,
	deleteOrder,
	verifyOrder,
	deleteAllOrder,
	conFirmStatus
} = require("../controllers/Order.controller")

const orderRouter = express.Router()
orderRouter.put("/verify/", verifyOrder)
orderRouter.get("/", getAllOrder)
orderRouter.post("/", createOrder)
orderRouter.get("/:id", getOrderById)
orderRouter.put("/:id", updateOrder)
orderRouter.delete("/:id", deleteOrder)
orderRouter.delete("/", deleteAllOrder)
orderRouter.put("/confirm/:id", conFirmStatus)

module.exports = orderRouter
