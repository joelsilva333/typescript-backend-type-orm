import dotenv from "dotenv"
import express from "express"
import "./connection"
import productController from "./controllers/product.controller"

dotenv.config()
const PORT = process.env.PORT || 8080
const app = express()

app.get("/api/products/", productController.findAll)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
	res.send("Hello, World!")
})
