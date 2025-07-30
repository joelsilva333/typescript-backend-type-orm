import { Request, Response } from "express"
import AppDataSource from "../connection"
import { Product } from "../entities/product.entity"
import { Repository } from "typeorm"

class ProductController {
	private productRepository: Repository<Product>

	constructor() {
		this.productRepository = AppDataSource.getRepository(Product)
	}

	/**
	 * @swagger
	 * /api/products/:
	 *   get:
	 *     summary: Lista todos os produtos
	 *     tags:
	 *       - Produtos
	 *     responses:
	 *       200:
	 *         description: Produtos encontrados com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/Product'
	 *                 message:
	 *                   type: string
	 */
	async findAll(request: Request, response: Response): Promise<Response> {
		const products = await this.productRepository.find()
		return response.status(200).send({
			data: products,
			message: "Produtos encontrados com sucesso",
		})
	}

	/**
	 * @swagger
	 * /api/products/:
	 *   post:
	 *     summary: Cria um novo produto
	 *     tags:
	 *       - Produtos
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ProductInput'
	 *     responses:
	 *       201:
	 *         description: Produto criado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/Product'
	 *                 message:
	 *                   type: string
	 */
	async create(request: Request, response: Response): Promise<Response> {
		const { name, description, weight } = request.body

		const product = this.productRepository.create({ name, description, weight })
		const productDb = await this.productRepository.save(product)

		return response.status(201).send({
			data: productDb,
			message: "Produto criado com sucesso",
		})
	}

	/**
	 * @swagger
	 * /api/products/{id}:
	 *   get:
	 *     summary: Busca um produto por ID
	 *     tags:
	 *       - Produtos
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Produto encontrado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/Product'
	 *                 message:
	 *                   type: string
	 *       404:
	 *         description: Produto não encontrado
	 */
	async findOne(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const product = await this.productRepository.findOneBy({ id })

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

	/**
	 * @swagger
	 * /api/products/{id}:
	 *   put:
	 *     summary: Atualiza um produto por ID
	 *     tags:
	 *       - Produtos
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/ProductInput'
	 *     responses:
	 *       200:
	 *         description: Produto atualizado com sucesso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 data:
	 *                   $ref: '#/components/schemas/Product'
	 *                 message:
	 *                   type: string
	 *       404:
	 *         description: Produto não encontrado
	 */
	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		try {
			const product = await this.productRepository.findOneByOrFail({ id })
			const { name, description, weight } = request.body

			product.name = name
			product.description = description
			product.weight = weight

			const productDb = await this.productRepository.save(product)

			return response.status(200).send({
				data: productDb,
				message: "Produto atualizado com sucesso",
			})
		} catch (error) {
			return response.status(404).send({
				message: "Produto não encontrado",
			})
		}
	}
}

export default new ProductController()
