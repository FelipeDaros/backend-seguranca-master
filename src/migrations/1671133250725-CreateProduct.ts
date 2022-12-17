import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1671133250725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "quantity",
                    type: "int",
                },
                {
                    name: "price",
                    type: "decimal(5,2)"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
