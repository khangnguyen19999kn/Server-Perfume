const mongoose = require("mongoose")
const Brands = require("../models/Brands")
const getAllBrands = async (req, res) => {
	try {
		const brands = await Brands.find({})
		res.status(201).json(brands)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const createBrand = async (req, res) => {
	const {name} = req.body
	const id = new mongoose.Types.ObjectId()
	try {
		const brand = await Brands.create({
			name,
			id,
			_id: id
		})
		res.status(201).json(brand)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getBrandById = async (req, res) => {
	const {id} = req.params
	try {
		const brand = await Brands.findById(id)
		res.status(201).json(brand)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const updateBrand = async (req, res) => {
	const {id} = req.params
	const {name} = req.body
	try {
		const brand = await Brands.findById(id).update({
			name
		})
		res.status(201).json(brand)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const getBrandByName = async (req, res) => {
	const {name} = req.params
	try {
		const brand = await Brands.find({name})
		res.status(201).json(brand)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
const deleteBrand = async (req, res) => {
	const {id} = req.params
	try {
		await Brands.deleteOne({_id: id})
		res.status(201).send("Delete successfully")
	} catch (error) {
		res.status(400).json({message: error.message})
	}
}
module.exports = {
	getAllBrands,
	createBrand,
	getBrandById,
	updateBrand,
	getBrandByName,
	deleteBrand
}
