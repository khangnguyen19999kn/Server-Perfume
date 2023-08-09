const express = require("express")
const multer = require("multer")

const {
	getAllProducts,
	createProduct,
	getProductById,
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

} = require("../controllers/Product.controller")
const productRouter = express.Router()

/*
 * @desc Get all products
 * @route GET /api/product
 * @access Public
 */
//Set up multer for file upload
const storage = multer.diskStorage({
	filename(req, file, cb) {
		// Set the file name with a unique identifier (timestamp + original file name)
		cb(null, `${Date.now()}-${file.originalname}`)
	}
})

const upload = multer({storage})

productRouter.get("/", getAllProducts)
productRouter.post("/", upload.array("img"), createProduct)
productRouter.get("/favorite", getTenFavoriteProducts)
productRouter.get("/:id", getProductById)
productRouter.put("/:id", upload.array("img"), updateProduct)
productRouter.put("/increase/:id", increaseQuantitySoldByID)
productRouter.delete("/:id", deleteProduct)
productRouter.get("/sort/price/ascending", sortPriceAscending)
productRouter.get("/sort/price/descending", sortPriceDescending)
productRouter.get("/sort/concentration", getProductByConcentrationAndBrand)
productRouter.get("/sort/name", getProductByName)
productRouter.get("/collection/:type", findProductByType)
productRouter.put("/rate", updateRateAllProduct)


module.exports = productRouter
