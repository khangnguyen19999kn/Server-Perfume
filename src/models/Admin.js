const mongoose = require("mongoose")
const {Schema} = mongoose

const AdminSchema = new Schema(
	{
		id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		phoneNumber: {type: String, required: true},
		otp: {type: String}
	},
	{
		timestamps: true,
		toJSON: {virtuals: true}
	}
)
AdminSchema.pre(/^find/, function (next) {
	this.select("-_id -__v")
	next()
})
const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin
