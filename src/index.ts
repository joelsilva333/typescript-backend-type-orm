import dotenv from "dotenv";
import express from "express";
import "@/connection";
import productController from "@/controllers/product.controller";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/swagger";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/products/", productController.findAll);
app.post("/api/products/", productController.create);
app.get("/api/products/:id", productController.findOne);
app.put("/api/products/:id", productController.update);
app.delete("/api/products/:id", productController.delete);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
