const mongoose = require("mongoose")
const {Schema} = mongoose

const BrandsSchema = new Schema(
	{
		id: mongoose.Types.ObjectId,
		name: {type: String, required: true},

	},
	{
		timestamps: true
	}
)

BrandsSchema.pre(/^find/, function (next) {
	this.select("-_id -__v")
	next()
})
const Product = mongoose.model("Brand", BrandsSchema)
module.exports = Product
