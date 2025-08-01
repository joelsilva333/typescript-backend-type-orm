import { IsNotEmpty, Length } from "class-validator"
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("product")
export class Product {
	@PrimaryColumn()
	id: string

	@Column()
	@IsNotEmpty()
	@Length(3, 100)
	name: string

	@Column()
	@IsNotEmpty()
	@Length(3, 100)
	description: string

	@Column()
	@IsNotEmpty()
	@Length(3, 100)
	weight: number

	@CreateDateColumn({
		name: "created_at",
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt: Date

	constructor() {
		if (!this.id) {
			this.id = uuid()
		}
	}
}
