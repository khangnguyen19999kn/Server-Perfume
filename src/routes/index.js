const express = require("express")
const mainRoute = express.Router()

const productRouter = require("./Product.router")
const brandRouter = require("./Brand.router")
const blogRouter = require("./Blog.router")
const orderRouter = require("./Order.router")
const adminRouter = require("./Admin.router")

mainRoute.use("/product", productRouter)
mainRoute.use("/brand", brandRouter)
mainRoute.use("/blog", blogRouter)
mainRoute.use("/order", orderRouter)
mainRoute.use("/admin", adminRouter)

module.exports = {mainRoute}
