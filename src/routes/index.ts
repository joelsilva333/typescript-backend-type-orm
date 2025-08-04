import productController from "@/controllers/product.controller"
import { Router, Response, Request } from "express"

const routes = Router()

routes.get("/api/products/", productController.findAll)
routes.post("/api/products/", productController.create)
routes.get("/api/products/:id", productController.findOne)
routes.put("/api/products/:id", productController.update)
routes.delete("/api/products/:id", productController.delete)
routes.get("/", (_, res: Response) => {
	res.status(200).send({ success: true })
})
routes.get("*", (_: Request, res: Response) => {
	res.status(404).send({ error: "Not Found" })
})

export default routes
