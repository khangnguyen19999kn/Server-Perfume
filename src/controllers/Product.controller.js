const mongoose = require("mongoose")
const cloudinary = require("../config/cloudinary")
const {getNameImage} = require("../utils/getNameImage")
const {convertToSlug} = require("../utils/convertToSlug")
const Product = require("../models/Product")
const {generateVerificationCode, sendEmailVerifyToReview} = require("./Mail.controller")

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(201).json(products)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

const createProduct = async (req, res) => {
	const {
		name,
		type,
		brand,
		priceFor10ml,
		priceForFull,
		concentration,
		note,
		ingredient,
		quantitySold,
		introduce
	} = req.body
	const id = new mongoose.Types.ObjectId()
	try {
		const {files} = req
		const uploadPromises = files.map(file => cloudinary.uploader.upload(file.path))
		const cloudinaryResponses = await Promise.all(uploadPromises)
		const imageUrls = cloudinaryResponses.map(response => response.secure_url)

		const product = await Product.create({
			name,
			type,
			brand,
			concentration,
			priceFor10ml,
			priceForFull,
			img: imageUrls,
			id,
			note,
			ingredient,
			quantitySold,
			introduce,
			_id: id
		})

		res.status(201).json(product)
	} catch (error) {
		console.log(error)
		res.status(400).json({message: error.message})
	}
}
const getProductBySlug = async (req, res) => {
	const {slug} = req.params
	try {
		const product = await Product.findOne({slug})
		res.status(201).json(product)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const updateProduct = async (req, res) => {
	const {id} = req.params
	const {
		name,
		type,
		brand,
		priceFor10ml,
		priceForFull,
		concentration,
		note,
		ingredient,
		quantitySold,
		introduce,
		imgAfter
	} = req.body

	try {
		const product = await Product.findById(id)

		if (!product) {
			return res.status(404).json({message: "Product not found"})
		}
		const {files} = req
		// Sử dụng Promise.all để tải lên các tệp ảnh cùng lúc và chờ cho đến khi tất cả hoàn thành
		const uploadPromises = files.map(file => cloudinary.uploader.upload(file.path))
		const cloudinaryResponses = await Promise.all(uploadPromises)
		// Lưu các URL của ảnh trong cơ sở dữ liệu của bạn
		const imageUrls = cloudinaryResponses.map(response => response.secure_url)

		const itemNeedDelete = product.img.filter(item => !imgAfter.split(",").includes(item))
		itemNeedDelete.forEach(item => {
			const fileName = getNameImage(item)
			cloudinary.uploader.destroy(fileName)
		})
		const imgUpdate = imgAfter.split(",").concat(imageUrls)

		await Product.findByIdAndUpdate(id, {
			name,
			type,
			brand,
			priceFor10ml,
			priceForFull,
			img: imgUpdate,
			concentration,
			note,
			ingredient,
			quantitySold,
			introduce,
			slug: convertToSlug(name)
		})

		res.status(200).json({message: "Success"})
	} catch (error) {
		console.log(error)
		res.status(400).json({message: error.message})
	}
}
const deleteProduct = async (req, res) => {
	const {id} = req.params
	try {
		const product = await Product.findOne({id})
		if (!product) {
			return res.status(404).json({message: "Product not found"})
		}
		const {img} = product
		img.forEach(imgURL => {
			const fileName = imgURL.split("/").slice(-1)[0].replace(".jpg", "")
			cloudinary.uploader.destroy(fileName)
		})
		await Product.findByIdAndDelete(id)
		res.status(201).send("Delete complete")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const sortPriceAscending = async (req, res) => {
	try {
		const products = await Product.find().sort({priceForFull: 1})
		res.status(201).json(products)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const sortPriceDescending = async (req, res) => {
	try {
		const products = await Product.find().sort({priceForFull: -1})
		res.status(201).json(products)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

const getProductByConcentrationAndBrand = async (req, res) => {
	const searchString = {}

	if (req.query.concentration) {
		searchString.concentration = {$regex: req.query.concentration, $options: "i"}
	}
	if (req.query.brand) {
		searchString.brand = {$regex: req.query.brand, $options: "i"}
	}
	if (req.query.type) {
		searchString.type = {$regex: req.query.type, $options: "i"}
	}

	try {
		const product = await Product.find(searchString)
		res.status(201).json(product)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getProductByName = async (req, res) => {
	const searchString = {}

	if (req.query.name) {
		searchString.name = {$regex: req.query.name, $options: "i"}
	}
	try {
		const product = await Product.find(searchString)
		res.status(201).json(product)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getTenFavoriteProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort({quantitySold: -1}).limit(10)
		res.status(201).json(products)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const increaseQuantitySoldByID = async (req, res) => {
	try {
		const {id} = req.params
		const product = await Product.findById(id)
		await Product.updateOne({_id: id}, {quantitySold: product.quantitySold + 1})
		res.status(201).json("Success")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const findProductByType = async (req, res) => {
	const {type} = req.params
	try {
		const product = await Product.find({type})
		res.status(201).json(product)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const updateRateAllProduct = async (req, res) => {
	try {
		await Product.updateMany({}, {$set: {rate: [4]}}, {multi: true})
		res.status(201).json("Success")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const sendComment = async (req, res) => {
	const {email, comment, rate, name} = req.body
	const {id} = req.params
	const verificationCode = generateVerificationCode()
	try {
		const product = await Product.findById(id)
		if (product) {
			sendEmailVerifyToReview(email, verificationCode)
			product.reviews.push({
				email,
				comment,
				verifyCode: verificationCode,
				isVerify: false,
				rate,
				name
			})
			product.rate.push(rate)
			await Product.findByIdAndUpdate(id, {
				reviews: product.reviews,
				rate: product.rate
			})
			res.status(201).json({message: "Send mail success"})
		} else {
			res.status(400).json({message: "Product not found"})
		}
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const verifyMailToComment = async (req, res) => {
	const {id} = req.params
	const {verifyCode, email} = req.body
	try {
		const product = await Product.findById(id)
		if (product) {
			const indexUpdate = product.reviews.findIndex(
				comment => comment.email === email && comment.verifyCode === verifyCode
			)
			if (indexUpdate !== -1) {
				product.reviews[indexUpdate].isVerify = true
				await Product.findByIdAndUpdate(id, {reviews: product.reviews})
				res.status(201).json({message: "Verify success"})
			} else {
				res.status(400).json({message: "Verify fail"})
			}
		}
	} catch (error) {
		console.log(error)
	}
}
const verifyFail = async (req, res) => {
	const {id} = req.params
	const {comment} = req.body
	try {
		const {reviews} = await Product.findById(id)
		const indexUpdate = reviews.findIndex(review => review.comment === comment)
		if (indexUpdate !== -1) {
			reviews.splice(indexUpdate, 1)
		}
		await Product.findByIdAndUpdate(id, {reviews})
		res.status(201).json({message: "Delete success"})
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}

module.exports = {
	getAllProducts,
	createProduct,
	getProductBySlug,
	updateProduct,
	deleteProduct,
	sortPriceAscending,
	sortPriceDescending,
	getProductByConcentrationAndBrand,
	getProductByName,
	getTenFavoriteProducts,
	increaseQuantitySoldByID,
	findProductByType,
	updateRateAllProduct,
	sendComment,
	verifyMailToComment,
	verifyFail
}
