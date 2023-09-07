const mongoose = require("mongoose")
const {Schema} = mongoose

const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)

const BlogSchema = new Schema(
	{
		id: mongoose.Types.ObjectId,
		title: {type: String, required: true},
		content: {type: String, required: true},
		author: {type: String, required: true},
		date: {type: Date, required: true},
		slug: {type: String, slug: "title", unique: true},
		imgPosing: {type: String, required: true}
	},
	{
		timestamps: true
	}
)

BlogSchema.pre(/^find/, function (next) {
	this.select("-_id -__v")
	next()
})
const Blog = mongoose.model("Blog", BlogSchema)
module.exports = Blog
