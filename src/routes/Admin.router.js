const express = require("express")
const AdminRouter = express.Router()
const {checkExistAdmin} = require("../middlewares/Admin.middleware")
const {
	createAdmin,
	loginAdmin,
	verifyAdmin,
	getAllAdmin,
	checkTokenValidity
} = require("../controllers/Admin.controller")

AdminRouter.post("/", checkExistAdmin, createAdmin)
AdminRouter.post("/login", loginAdmin)
AdminRouter.post("/verify", verifyAdmin)
AdminRouter.get("/", getAllAdmin)
AdminRouter.post("/check-token-validity", checkTokenValidity)

module.exports = AdminRouter
