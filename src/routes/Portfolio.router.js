const express = require("express")
const {sendEmail} = require("../controllers/Portfolio.controller")
const portfolioRouter = express.Router()

portfolioRouter.post("/", sendEmail)

module.exports = portfolioRouter
