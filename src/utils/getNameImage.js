const getNameImage = name => {
	const result = name.split("/").slice(-1)[0].replace(".jpg", "")
	return result
}
module.exports = {getNameImage}
