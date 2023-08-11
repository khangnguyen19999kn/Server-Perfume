const mongoose = require("mongoose")
const Order = require("../models/Order")
const {verifyCode} = require("./SMS.controller")
const {sendNotificationOrder} = require("./Mail.controller")
const {sendVerificationEmail, generateVerificationCode} = require("./Mail.controller")

const getAllOrder = async (req, res) => {
	try {
		const orders = await Order.find({}).sort({status: 1})
		res.status(201).json(orders)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const createOrder = async (req, res) => {
	const {
		customerName,
		email,
		phone,
		deliveryWay,
		city,
		district,
		ward,
		address,
		itemBuy
	} = req.body
	const verificationCode = generateVerificationCode()
	// const verificationCode = generateVerificationCode()
	// sendVerificationCodeSMS(`+84${phone.replace("0", "")}`, verificationCode)
	sendVerificationEmail(email, verificationCode)
	const id = new mongoose.Types.ObjectId()
	try {
		const order = await Order.create({
			customerName,
			email,
			phone,
			deliveryWay,
			city,
			district,
			ward,
			address,
			itemBuy,
			id,
			_id: id,
			otp: verificationCode
		})
		res.status(201).json(order)
	} catch (error) {
		console.log(error)
		res.status(400).json({message: error.message})
	}
}
const verifyOrder = async (req, res) => {
	const {otp, id} = req.body

	try {
		const order = await Order.findById(id)
		if (verifyCode(otp, order.otp)) {
			await Order.updateOne({id}, {isVerify: true})
			console.log(order)
			sendNotificationOrder()
			res.status(201).json({message: "Verify success"})
		} else res.status(400).json({message: "Verify fail"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getOrderById = async (req, res) => {
	const {id} = req.params
	try {
		const order = await Order.findById(id)
		res.status(201).json(order)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const updateOrder = async (req, res) => {
	const {id} = req.params
	const {
		customerName,
		email,
		phone,
		deliveryWay,
		city,
		district,
		ward,
		address,
		itemBuy
	} = req.body
	try {
		const order = await Order.findByIdAndUpdate(id, {
			customerName,
			email,
			phone,
			deliveryWay,
			city,
			district,
			ward,
			address,
			itemBuy
		})
		res.status(201).json(order)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const deleteOrder = async (req, res) => {
	const {id} = req.params
	try {
		await Order.findByIdAndDelete(id)
		res.status(201).send("Delete order successfully")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const deleteAllOrder = async (req, res) => {
	try {
		await Order.deleteMany({})
		res.status(201).send("Delete all order successfully")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const conFirmStatus = async (req, res) => {
	const {id} = req.params
	try {
		await Order.findByIdAndUpdate(id, {
			status: true
		})
		res.status(201).send("Confirm status successfully")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

module.exports = {
	getAllOrder,
	createOrder,
	getOrderById,
	updateOrder,
	deleteOrder,
	verifyOrder,
	deleteAllOrder,
	conFirmStatus
}
