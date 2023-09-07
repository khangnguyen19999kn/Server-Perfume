const convertToSlug = text => {
	let slug = text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")

	slug = slug.replace(/\s+/g, "-")

	return slug
}
module.exports = {convertToSlug}
