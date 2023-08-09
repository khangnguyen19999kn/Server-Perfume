const cloudinary = require("cloudinary").v2

cloudinary.config({
	cloud_name: "dobziac3s",
	api_key: "554731364812488",
	api_secret: process.env.SECRET_KEY_CLOUDINARY
})

module.exports = cloudinary
