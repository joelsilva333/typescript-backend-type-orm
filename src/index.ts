import "module-alias/register"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import "@/database/connection"
import routes from "./routes"

dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
	console.log(`Swagger docs: http://localhost:${PORT}/api-docs`)
})
