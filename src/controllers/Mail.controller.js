const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
	service: "Gmail", // Ví dụ: 'Gmail'
	auth: {
		user: "nguoidangsuy2004@gmail.com",
		pass: "jsgebulxzigrarci"
	}
})
const generateVerificationCode = () => {
	// Hàm tạo mã xác nhận ngẫu nhiên
	const length = 6
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let code = ""
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length)
		code += charset[randomIndex]
	}
	return code
}
const sendVerificationEmail = (userEmail, verificationCode) => {
	const mailOptions = {
		from: "nguoidangsuy2004@gmail.com",
		to: userEmail,
		subject: "Mã Xác Nhận Đơn Hàng OASIS Fragrance",
		text: `Đây là mã xác nhận của bạn: ${verificationCode}`
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
		} else {
			console.log(`Email sent: ${info.response}`)
		}
	})
}

module.exports = {
	sendVerificationEmail,
	generateVerificationCode
}
