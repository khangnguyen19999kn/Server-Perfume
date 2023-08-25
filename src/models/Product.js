const mongoose = require("mongoose")
const {Schema} = mongoose

const ProductSchema = new Schema(
	{
		id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		type: {type: String, required: true},
		brand: {type: String, required: true},
		concentration: {type: String, required: true},
		priceFor10ml: {type: Number, required: true},
		priceForFull: {type: Number, required: true},
		img: [String],
		note: {type: String, default: "<b>Chưa có thông tin</b>"},
		ingredient: {type: String, default: "<b>Chưa có thông tin</b>"},
		quantitySold: {type: Number, default: 0},
		rate: {type: [Number], default: [5]},
		introduce: {type: String, default: "Chưa có thông tin"},
		reviews: [
			{
				email: {type: String, required: true},
				comment: {type: String, required: true},
				verifyCode: {type: String, required: true},
				isVerify: {type: Boolean, default: false},
				rate: {type: Number, required: true},
				createdAt: {type: Date, default: Date.now}
			}
		]
	},
	{
		toJSON: {virtuals: true},
		timestamps: true
	}
)
ProductSchema.virtual("averageRate").get(function () {
	const avg = this.rate.reduce((a, b) => a + b, 0) / this.rate.length
	return avg
})

ProductSchema.pre(/^find/, function (next) {
	this.select("-_id -__v")
	next()
})
const Product = mongoose.model("Product", ProductSchema)
module.exports = Product
