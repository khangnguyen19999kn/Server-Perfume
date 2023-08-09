const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")
const {generateVerificationCode, sendVerificationCodeSMS} = require("./SMS.controller")
const getAllAdmin = async (req, res) => {
	try {
		const admins = await Admin.find({})
		res.status(201).json(admins)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const createAdmin = async (req, res) => {
	const {name, phoneNumber} = req.body
	try {
		const admin = await Admin.create({
			name,
			phoneNumber
		})
		res.status(201).json(admin)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const loginAdmin = async (req, res) => {
	const {phoneNumber} = req.body
	try {
		const admin = await Admin.findOne({phoneNumber})
		if (admin) {
			//update otp admin
			const verificationCode = generateVerificationCode()
			// sendVerificationCodeSMS(`+84${phoneNumber.replace("0", "")}`, verificationCode)
			await Admin.updateOne({phoneNumber}, {otp: verificationCode})
			res.status(201).json({message: "Sending OTP success"})
		} else {
			res.status(400).json({message: "Admin not found"})
		}
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const generateJWT = phoneNumber => {
	const payload = {
		phoneNumber,
		exp: Math.floor(Date.now() / 1000) + 86400 // Thời hạn JWT là 1 ngày (86400 giây)
	}

	// Thay thế 'your_secret_key' bằng một chuỗi bất kỳ, đây là secret key để mã hóa JWT
	const token = jwt.sign(payload, process.env.SECRET_KEY)

	return token
}
const verifyAdmin = async (req, res) => {
	const {otp, phoneNumber} = req.body
	try {
		const admin = await Admin.findOne({phoneNumber})
		if (admin && otp === admin.otp) {
			const token = generateJWT(phoneNumber)
			res.status(201).json({message: "Verify success", token})
		} else res.status(400).json({message: "Verify fail"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const checkTokenValidity = (req, res) => {
	const {token} = req.body
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const {exp} = decoded
		if (exp > Math.floor(Date.now() / 1000)) {
			res.status(201).json({message: "Token is valid", valid: true})
		} else {
			res.status(400).json({message: "Token is invalid", valid: false})
		}
	} catch (error) {
		res.status(400).json({message: "Token is invalid", valid: false})
	}
}

module.exports = {
	createAdmin,
	loginAdmin,
	verifyAdmin,
	getAllAdmin,
  checkTokenValidity
}
