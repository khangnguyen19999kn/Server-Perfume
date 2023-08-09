const mongoose = require("mongoose")
const Blog = require("../models/Blog")
const cloudinary = require("../config/cloudinary")
const {getNameImage} = require("../utils/getNameImage")
function convertToSlug(text) {
	let slug = text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")

	slug = slug.replace(/\s+/g, "-")

	return slug
}
const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find({})
		res.status(201).json(blogs)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getBlogByTitle = async (req, res) => {
	const searchString = {slug: req.params.title}
	try {
		const blog = await Blog.findOne(searchString)
		res.status(201).json(blog)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const createBlog = (req, res) => {
	const {title, content, author, date} = req.body
	const id = new mongoose.Types.ObjectId()
	const {file} = req

	cloudinary.uploader
		.upload(file.path)
		.then(async result => {
			try {
				const blog = await Blog.create({
					title,
					content,
					author,
					date,
					imgPosing: result.secure_url,
					id,
					_id: id
				})
				res.status(201).json(blog)
			} catch (error) {
				res.status(400).json({message: error.message})
			}
		})
		.catch(error => {
			console.log(error)
		})
}
const updateBlog = async (req, res) => {
	const {id} = req.params
	const {title, content, author, date} = req.body
	try {
		const blog = await Blog.findById(id)
		if (!blog) return res.status(404).json({message: "Blog not found"})
		// let imgFilePath
		if (req.file) {
			const fileNeedDelete = getNameImage(blog.imgPosing)
			cloudinary.uploader.destroy(fileNeedDelete)
			const {path} = req.file
			const result = await cloudinary.uploader.upload(path)
			const imgPosing = result.secure_url
			await Blog.findOneAndUpdate(
				{id},
				{
					imgPosing
				}
			)
		}
		await Blog.findOneAndUpdate(
			{id},
			{
				title,
				content,
				author,
				date,
				slug: convertToSlug(title)
			},
			{new: true}
		)
		return res.status(201).json({message: "Blog updated"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const deleteBlog = async (req, res) => {
	const {id} = req.params
	try {
		const blog = await Blog.findById(id)
		if (!blog) return res.status(404).json({message: "Blog not found"})
		if (blog.imgPosing) {
			cloudinary.uploader.destroy(getNameImage(blog.imgPosing))
		}
		await Blog.deleteOne({id})
		res.status(201).json({message: "Blog deleted"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getBlogByID = async (req, res) => {
	const {id} = req.params
	try {
		const blog = await Blog.findById(id)
		res.status(201).json({
			id: blog.id,
			title: blog.title,
			content: blog.content,
			imgPosing: blog.imgPosing,
			author: blog.author,
			date: blog.date
		})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

module.exports = {
	getAllBlogs,
	getBlogByTitle,
	createBlog,
	updateBlog,
	deleteBlog,
	getBlogByID
}
