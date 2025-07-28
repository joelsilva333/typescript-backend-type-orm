import { Request, Response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

class ProductController {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return response.status(200).send({
      data: products,
      message: "Products retrieved successfully",
    });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = new Product();

    const { name, description, weight } = request.body;

    product.name = name;
    product.description = description;
    product.weight = weight;

    const productDb = await productRepository.save(product);

    return response.status(201).send({
      data: productDb,
      message: "Product created successfully",
    });
  }
}

export default new ProductController();
