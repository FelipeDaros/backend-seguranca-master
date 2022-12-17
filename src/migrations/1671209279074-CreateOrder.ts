import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrder1671209279074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    generationStrategy: 'uuid',
                    isPrimary: true
                },
                {
                    name: "user_id",
                    type: "varchar"
                },
                {
                    name: "total",
                    type: "numeric(5,2)"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }));

        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
        await queryRunner.dropForeignKey("orders", "user_id");
    }

}
