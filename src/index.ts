import "module-alias/register"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"

import "@/connection"
import { swaggerSpec } from "@/swagger"

import routes from "@/routes"

dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(routes)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
	console.log(`Swagger docs: http://localhost:${PORT}/api-docs`)
})
