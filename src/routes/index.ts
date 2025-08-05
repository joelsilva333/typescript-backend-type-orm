import productController from "@/controllers/product.controller"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "@/swagger"
import { Router, Response, Request } from "express"

const routes = Router()

routes.get("/api/products/", productController.findAll)
routes.post("/api/products/", productController.create)
routes.get("/api/products/:id", productController.findOne)
routes.put("/api/products/:id", productController.update)
routes.delete("/api/products/:id", productController.delete)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
routes.get("/", (request: Request, res: Response) => {
	res.status(200).send({ success: true })
})

export default routes
