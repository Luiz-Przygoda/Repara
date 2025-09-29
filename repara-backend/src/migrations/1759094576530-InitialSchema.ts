import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema1759094576530 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cliente",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "nome", type: "varchar", length: "100", isNullable: false },
                { name: "telefone", type: "varchar", length: "20", isNullable: true },
                { name: "email", type: "varchar", length: "100", isNullable: true },
                { name: "endereco", type: "varchar", length: "200", isNullable: true }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "veiculo",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "cliente_id", type: "int", isNullable: false },
                { name: "marca", type: "varchar", length: "50", isNullable: true },
                { name: "modelo", type: "varchar", length: "50", isNullable: true },
                { name: "ano", type: "date", isNullable: true },
                { name: "placa", type: "varchar", length: "10", isUnique: true, isNullable: true }
            ]
        }));
        await queryRunner.createForeignKey("veiculo", new TableForeignKey({
            columnNames: ["cliente_id"],
            referencedTableName: "cliente",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));

        await queryRunner.createTable(new Table({
            name: "servico",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "nome", type: "varchar", length: "100", isNullable: false },
                { name: "descricao", type: "varchar", length: "200", isNullable: true },
                { name: "preco", type: "decimal", precision: 10, scale: 2, isNullable: false }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "funcionario",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "nome", type: "varchar", length: "100", isNullable: false },
                { name: "cargo", type: "varchar", length: "50", isNullable: true }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "ordem_servico",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "cliente_id", type: "int", isNullable: false },
                { name: "veiculo_id", type: "int", isNullable: false },
                { name: "funcionario_id", type: "int", isNullable: true },
                { name: "data_abertura", type: "datetime", default: "CURRENT_TIMESTAMP" },
                { name: "data_fechamento", type: "datetime", isNullable: true },
                { name: "status", type: "enum", enum: ["aberta","em_andamento","concluida","cancelada"], default: "'aberta'" },
                { name: "observacoes", type: "text", isNullable: true }
            ]
        }));
        await queryRunner.createForeignKey("ordem_servico", new TableForeignKey({
            columnNames: ["cliente_id"],
            referencedTableName: "cliente",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("ordem_servico", new TableForeignKey({
            columnNames: ["veiculo_id"],
            referencedTableName: "veiculo",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createForeignKey("ordem_servico", new TableForeignKey({
            columnNames: ["funcionario_id"],
            referencedTableName: "funcionario",
            referencedColumnNames: ["id"]
        }));

        await queryRunner.createTable(new Table({
            name: "item_ordem_servico",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "ordem_id", type: "int", isNullable: false },
                { name: "servico_id", type: "int", isNullable: true },
                { name: "descricao", type: "varchar", length: "200", isNullable: true },
                { name: "quantidade", type: "int", default: 1 },
                { name: "valor_unitario", type: "decimal", precision: 10, scale: 2, isNullable: true }
            ]
        }));
        await queryRunner.createForeignKey("item_ordem_servico", new TableForeignKey({
            columnNames: ["ordem_id"],
            referencedTableName: "ordem_servico",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("item_ordem_servico", new TableForeignKey({
            columnNames: ["servico_id"],
            referencedTableName: "servico",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("item_ordem_servico");
        await queryRunner.dropTable("ordem_servico");
        await queryRunner.dropTable("funcionario");
        await queryRunner.dropTable("servico");
        await queryRunner.dropTable("veiculo");
        await queryRunner.dropTable("cliente");
    }
}

