const mongoose = require("mongoose")

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			"mongodb+srv://17130094:Kn200499@cluster0.zvaobmb.mongodb.net/Perfume",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (err) {
		console.log(err)
	}
}
module.exports = {connectDB}
