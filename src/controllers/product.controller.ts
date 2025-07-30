import { Request, Response } from "express"
import AppDataSource from "../connection"
import { Product } from "../entities/product.entity"
import { Repository } from "typeorm"

class ProductController {
	private productRepository: Repository<Product>

	constructor() {
		this.productRepository = AppDataSource.getRepository(Product)
	}

	async findAll(request: Request, response: Response): Promise<Response> {
		const productRepository = AppDataSource.getRepository(Product)

		const products = await productRepository.find()

		return response.status(200).send({
			data: products,
			message: "Produtos encontrados com sucesso",
		})
	}

	async create(request: Request, response: Response): Promise<Response> {
		const productRepository = AppDataSource.getRepository(Product)
		const product = new Product()

		const { name, description, weight } = request.body

		product.name = name
		product.description = description
		product.weight = weight

		const productDb = await productRepository.save(product)

		return response.status(201).send({
			data: productDb,
			message: "Produto criado com sucesso",
		})
	}

	async findOne(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const productRepository = AppDataSource.getRepository(Product)
		const product = await productRepository.findOneBy({ id })

		if (!product) {
			return response.status(404).send({
				message: "Produto não encontrado",
			})
		}

		return response.status(200).send({
			data: product,
			message: "Produto encontrado com sucesso",
		})
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const productRepository = AppDataSource.getRepository(Product)
		let product

		try {
			product = await productRepository.findOneByOrFail({ id })
		} catch (error) {
			return response.status(404).send({
				message: "Produto não encontrado",
			})
		}

		const { name, description, weight } = request.body

		product.name = name
		product.description = description
		product.weight = weight

		try {
			const productDb = await productRepository.save(product)

			return response.status(200).send({
				data: productDb,
				message: "Produto atualizado com sucesso",
			})
		} catch (error) {
			return response.status(500).send({
				message: "Erro interno ao atualizar o produto",
			})
		}
	}
}

export default new ProductController()
