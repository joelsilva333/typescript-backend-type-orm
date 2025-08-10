import { IsNotEmpty, IsNumber, Length, Max, Min } from "class-validator"

export class CreateProductDTO {
	@IsNotEmpty()
	@Length(3, 100)
	name: string

	@IsNotEmpty()
	@Length(3, 100)
	description: string

	@IsNotEmpty()
	@IsNumber()
	@Min(3)
	@Max(100)
	weight: number
}

export class UpdateProductDTO extends CreateProductDTO {
	id: string
}
