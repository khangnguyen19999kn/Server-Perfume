const mongoose = require("mongoose")
const {Schema} = mongoose

const OrderSchema = new Schema(
	{
		id: mongoose.Types.ObjectId,
		customerName: {type: String, required: true},
		email: {type: String, required: true},
		phone: {type: String, required: true},
		deliveryWay: {type: String, required: true},
		city: {type: Object, required: true},
		district: {type: Object, required: true},
		ward: {type: Object, required: true},
		address: {type: String, required: true},
		itemBuy: {type: Array, required: true},
		otp: {type: String, required: true},
		isVerify: {type: Boolean, default: false},
		status: {type: Boolean, default: false}
	},
	{
		timestamps: true,
		toJSON: {virtuals: true}
	}
)
OrderSchema.virtual("totalPrice").get(function () {
	const totalPrice = this.itemBuy.reduce(
		(a, b) => a + parseFloat(b.price.replace(/[^0-9.-]+/g, "")) * b.quantity,
		0
	)
	return `${totalPrice.toLocaleString()}đ`
})

OrderSchema.pre(/^find/, function (next) {
	this.select("-_id -__v")
	next()
})
const Order = mongoose.model("Order", OrderSchema)
module.exports = Order
