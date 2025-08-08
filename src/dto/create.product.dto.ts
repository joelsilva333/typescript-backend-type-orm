import { IsNotEmpty, Length } from "class-validator"

export class CreateProductDTO {
	@IsNotEmpty()
	@Length(3, 100)
	name: string
	
	@IsNotEmpty()
	@Length(3, 100)
	description: string

	@IsNotEmpty()
	@Length(3, 100)
	weight: number
}
