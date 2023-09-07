const express = require("express")
const multer = require("multer")

const {
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
productRouter.get("/:slug", getProductBySlug)
productRouter.put("/:id", upload.array("img"), updateProduct)
productRouter.put("/increase/:id", increaseQuantitySoldByID)
productRouter.delete("/:id", deleteProduct)
productRouter.get("/sort/price/ascending", sortPriceAscending)
productRouter.get("/sort/price/descending", sortPriceDescending)
productRouter.get("/sort/concentration", getProductByConcentrationAndBrand)
productRouter.get("/sort/name", getProductByName)
productRouter.get("/collection/:type", findProductByType)
productRouter.put("/rate", updateRateAllProduct)
productRouter.post("/comment/:id", sendComment)
productRouter.put("/comment/verify/:id", verifyMailToComment)
productRouter.put("/comment/verify/fail/:id", verifyFail)

module.exports = productRouter
