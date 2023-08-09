const express = require("express")
const cors = require("cors")
// const {createServer} = require("http")
// const {Server} = require("socket.io")
require("dotenv").config()
// const httpServer = createServer()
// const io = new Server(httpServer, {
// 	cors: {
// 		origin: "*"
// 	}
// })
const db = require("./src/config/db")
const app = express()
const port = 6969
const {mainRoute} = require("./src/routes")

app.use(express.static(`${__dirname}/public`))
app.use(cors())
db.connectDB()
app.use(express.urlencoded())
app.use(express.json())
app.use("/api/v1", mainRoute)

// const clients = []
// const admins = []
// io.on("connection", socket => {
// 	console.log(`Socket ${socket.id} connected`)

// 	const {role} = socket.handshake.query

// 	if (role === "user") {
// 		clients.push(socket.id)
// 		socket.emit("message", {
// 			id: "server",
// 			text: "Welcome! Please wait for an admin to connect or to get help soon contact https://www.facebook.com/khangnguyen20.04 ",
// 			sender: "server",
// 			timestamp: Date.now(),
// 			role: "admin"
// 		})
// 	}
// 	if (role === "admin") {
// 		admins.push(socket.id)
// 		socket.emit("message", {
// 			id: "server",
// 			text: "Welcome admin!",
// 			sender: "server",
// 			timestamp: Date.now(),
// 			role: "admin"
// 		})
// 	}

// 	socket.on("message", data => {
// 		const {message, id} = data

// 		if (role === "admin") {
// 			const userId = clients[admins.indexOf(id)]
// 			io.to(userId).emit("message", {
// 				id: socket.id,
// 				text: data.message,
// 				sender: socket.id,
// 				timestamp: Date.now(),
// 				role: "admin"
// 			})
// 			io.to(id).emit("message", {
// 				id: socket.id,
// 				text: data.message,
// 				sender: socket.id,
// 				timestamp: Date.now(),
// 				role: "admin"
// 			})

// 			console.log(`Admin message: ${message}`)
// 		} else {
// 			const adminSocketId = admins[clients.indexOf(id)]
// 			io.to(adminSocketId).emit("message", {
// 				id: socket.id,
// 				text: data.message,
// 				sender: socket.id,
// 				timestamp: Date.now(),
// 				role: "user"
// 			})
// 			io.to(id).emit("message", {
// 				id: socket.id,
// 				text: data.message,
// 				sender: socket.id,
// 				timestamp: Date.now(),
// 				role: "user"
// 			})

// 			console.log(`User message: ${message}`)
// 		}
// 	})
// 	socket.on("disconnect", () => {
// 		console.log(`Socket ${socket.id} disconnected`)
// 		clients.pop()
// 		admins.pop()
// 	})
// })
app.get("/", (req, res) => {
	res.send("Hello World!")
})
// httpServer.listen(3001, () => {
// 	console.log("Socket.io server listening on *:3001")
// })
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
