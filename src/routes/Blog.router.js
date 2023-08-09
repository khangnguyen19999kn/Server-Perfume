const express = require("express")
const multer = require("multer")
const blogRouter = express.Router()
const {
	getAllBlogs,
	getBlogByTitle,
	createBlog,
	updateBlog,
	deleteBlog,
	getBlogByID,
} = require("../controllers/Blog.controller")

const storage = multer.diskStorage({
	filename(req, file, cb) {
		// Set the file name with a unique identifier (timestamp + original file name)
		cb(null, `${Date.now()}-${file.originalname}`)
	}
})
const upload = multer({storage, limits: {fieldSize: 4 * 1024 * 1024}})
blogRouter.get("/", getAllBlogs)
blogRouter.get("/:id", getBlogByID)
blogRouter.get("/slug/:title", getBlogByTitle)
blogRouter.post("/", upload.single("imgPosing"), createBlog)
blogRouter.put("/:id", upload.single("imgPosing"), updateBlog)
blogRouter.delete("/:id", deleteBlog)

module.exports = blogRouter
