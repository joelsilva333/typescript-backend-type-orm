import { Request, Response } from "express"
import AppDataSource from "@/database/connection"
import { Product } from "@/entities/product.entity"
import { validate } from "class-validator"
import { ProductRepository } from "@/repositories/product.repository"
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto"

class ProductController {
	private productRepository: ProductRepository

	constructor() {
		this.productRepository = new ProductRepository()
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
	findAll = async (request: Request, response: Response): Promise<Response> => {
		const products = await this.productRepository.getAll()

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
	create = async (request: Request, response: Response): Promise<Response> => {
		const { name, description, weight } = request.body

		const createProductDTO = new CreateProductDTO()
		createProductDTO.name = name
		createProductDTO.description = description
		createProductDTO.weight = weight

		const errors = await validate(createProductDTO)
		if (errors.length > 0) {
			return response.status(422).send({ errors })
		}

		const productDb = await this.productRepository.create(createProductDTO)

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
	findOne = async (request: Request, response: Response): Promise<Response> => {
		const { id } = request.params

		const product = await this.productRepository.findOne(id)

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
	update = async (request: Request, response: Response): Promise<Response> => {
		const { id } = request.params
		const { name, description, weight } = request.body

		const updateProductDTO = new UpdateProductDTO()

		updateProductDTO.id = id
		updateProductDTO.name = name
		updateProductDTO.description = description
		updateProductDTO.weight = weight

		const errors = await validate(updateProductDTO)
		if (errors.length > 0) {
			return response.status(422).send({
				message: "Erro de validação",
				errors: errors.map((error) => error.constraints),
			})
		}

		try {
			const productDb = await this.productRepository.update(updateProductDTO)

			if (!productDb) {
				return response.status(404).send({
					message: "Produto não encontrado",
				})
			}

			return response.status(200).send({
				data: productDb,
				message: "Produto atualizado com sucesso",
			})
		} catch (error: any) {
			return response.status(500).send({
				message: "Erro interno ao atualizar produto",
				error: error.message,
			})
		}
	}

	/**
	 * @swagger
	 * /api/products/{id}:
	 *   delete:
	 *     summary: Deleta um produto por ID
	 *     tags:
	 *       - Produtos
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       204:
	 *         description: Produto deletado com sucesso
	 *       404:
	 *         description: Produto não encontrado
	 */
	delete = async (request: Request, response: Response): Promise<Response> => {
		const { id } = request.params

		try {
			await this.productRepository.delete(id)

			return response.status(204).send()
		} catch (error) {
			return response.status(400).send({
				message: "Erro ao deletar produto",
			})
		}
	}
}

export default new ProductController()
