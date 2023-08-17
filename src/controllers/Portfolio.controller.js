const {sendEmailPortfolio} = require("./Mail.controller")

const sendEmail = (req, res) => {
	const {email, message} = req.body
	try {
		sendEmailPortfolio(email, message)
		res.status(201).json({message: "Send email success"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

module.exports = {
	sendEmail
}
