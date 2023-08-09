const path = require("path")

const getURL = urlData => {
	const url = urlData.split("/")
	const localUrl = path.join(
		__dirname,
		"../../public",
		url[url.length - 2],
		url[url.length - 1]
	)
	return localUrl
}
module.exports = {getURL}
