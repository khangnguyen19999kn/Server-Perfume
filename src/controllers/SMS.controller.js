const twilio = require("twilio")
const accountSid = "AC519fff8de5182c34a2a96e8075865153"
const authToken = "cefe4e4baae097975fef0b2574a237b2"
const client = twilio(accountSid, authToken)
function generateVerificationCode() {
	return Math.floor(Math.random() * 1000000)
}

const sendVerificationCodeSMS = (phoneNumber, verificationCode) => {
	client.messages
		.create({
			body: `OASIS Fragrance - Mã xác nhận số điện thoại của bạn là ${verificationCode}`,
			from: "+1 234 415 3726",
			to: phoneNumber
		})
		.then(message => console.log("SMS sent successfully!", message.sid))
		.catch(error => console.error("Error sending SMS:", error))
}

const verifyCode = (verificationCode, storedVerificationCode) =>
	verificationCode === storedVerificationCode

module.exports = {
	generateVerificationCode,
	sendVerificationCodeSMS,
	verifyCode
}
