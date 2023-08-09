const express = require("express")
const {
	getAllBrands,
	createBrand,
	getBrandById,
	updateBrand,
	getBrandByName,
	deleteBrand
} = require("../controllers/Brand.controller")
const brandRouter = express.Router()
brandRouter.get("/", getAllBrands)
brandRouter.post("/", createBrand)
brandRouter.get("/:id", getBrandById)
brandRouter.put("/:id", updateBrand)
brandRouter.get("/name/:name", getBrandByName)
brandRouter.delete("/:id", deleteBrand)

module.exports = brandRouter
