const Admin = require("../models/Admin")
const checkExistAdmin = async (req, res, next) => {
	const {phoneNumber} = req.body
	const existsAdmin = await Admin.find({phoneNumber})
	if (existsAdmin) {
		res.status(400).json({message: "Admin already exists"})
		return
	}
	next()
}
module.exports = {
	checkExistAdmin
}
