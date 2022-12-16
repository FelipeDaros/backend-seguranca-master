import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrderDetailsProducts1671210335016 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "order_details_products",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    generationStrategy: 'uuid',
                    isPrimary: true
                },
                {
                    name: "order_id",
                    type: "varchar",
                },
                {
                    name: "product_id",
                    type: "varchar"
                }
            ]
        }));

        await queryRunner.createForeignKey("order_details_products", new TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ["id"],
            referencedTableName: "orders",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("order_details_products", new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order_details_products");
        await queryRunner.dropForeignKey("order_details_products", "product_id");
        await queryRunner.dropForeignKey("order_details_products", "order_id");
    }

}
