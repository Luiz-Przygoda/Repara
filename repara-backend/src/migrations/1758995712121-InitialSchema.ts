import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1758995712121 implements MigrationInterface {
    name = 'InitialSchema1758995712121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP FOREIGN KEY \`veiculo_ibfk_1\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP FOREIGN KEY \`item_ordem_servico_ibfk_1\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP FOREIGN KEY \`item_ordem_servico_ibfk_2\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP FOREIGN KEY \`ordem_servico_ibfk_1\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP FOREIGN KEY \`ordem_servico_ibfk_2\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP FOREIGN KEY \`ordem_servico_ibfk_3\``);
        await queryRunner.query(`DROP INDEX \`cliente_id\` ON \`veiculo\``);
        await queryRunner.query(`DROP INDEX \`placa\` ON \`veiculo\``);
        await queryRunner.query(`DROP INDEX \`ordem_id\` ON \`item_ordem_servico\``);
        await queryRunner.query(`DROP INDEX \`servico_id\` ON \`item_ordem_servico\``);
        await queryRunner.query(`DROP INDEX \`cliente_id\` ON \`ordem_servico\``);
        await queryRunner.query(`DROP INDEX \`funcionario_id\` ON \`ordem_servico\``);
        await queryRunner.query(`DROP INDEX \`veiculo_id\` ON \`ordem_servico\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP COLUMN \`marca\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD \`marca\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP COLUMN \`modelo\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD \`modelo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` CHANGE \`ano\` \`ano\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP COLUMN \`placa\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD \`placa\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD UNIQUE INDEX \`IDX_a6a498ac4313a6bc4f8967c24d\` (\`placa\`)`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` CHANGE \`cliente_id\` \`cliente_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`cargo\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`cargo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`descricao\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD \`descricao\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`quantidade\` \`quantidade\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`ordem_id\` \`ordem_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`data_abertura\` \`data_abertura\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`status\` \`status\` enum ('aberta', 'em_andamento', 'concluida', 'cancelada') NOT NULL DEFAULT 'aberta'`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`cliente_id\` \`cliente_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`veiculo_id\` \`veiculo_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`telefone\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`telefone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`endereco\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`endereco\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD CONSTRAINT \`FK_08aa24ca0be223c0cc00b04a474\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD CONSTRAINT \`FK_313c3160d6629c66cd389677be7\` FOREIGN KEY (\`ordem_id\`) REFERENCES \`ordem_servico\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD CONSTRAINT \`FK_6f8c73fa446332eca3c7852c411\` FOREIGN KEY (\`servico_id\`) REFERENCES \`servico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD CONSTRAINT \`FK_1e6fc9a2df0fe9c992559beb41f\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD CONSTRAINT \`FK_ff8d357735243a01a95befb58a9\` FOREIGN KEY (\`veiculo_id\`) REFERENCES \`veiculo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD CONSTRAINT \`FK_b1e7989f372d90976c2fcb2639f\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP FOREIGN KEY \`FK_b1e7989f372d90976c2fcb2639f\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP FOREIGN KEY \`FK_ff8d357735243a01a95befb58a9\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP FOREIGN KEY \`FK_1e6fc9a2df0fe9c992559beb41f\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP FOREIGN KEY \`FK_6f8c73fa446332eca3c7852c411\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP FOREIGN KEY \`FK_313c3160d6629c66cd389677be7\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP FOREIGN KEY \`FK_08aa24ca0be223c0cc00b04a474\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`endereco\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`endereco\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`email\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`telefone\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`telefone\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`veiculo_id\` \`veiculo_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`cliente_id\` \`cliente_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`status\` \`status\` enum ('aberta', 'em_andamento', 'concluida', 'cancelada') NULL DEFAULT 'aberta'`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` CHANGE \`data_abertura\` \`data_abertura\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`ordem_id\` \`ordem_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`quantidade\` \`quantidade\` int NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD \`descricao\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`descricao\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`cargo\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`cargo\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` CHANGE \`cliente_id\` \`cliente_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP INDEX \`IDX_a6a498ac4313a6bc4f8967c24d\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP COLUMN \`placa\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD \`placa\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` CHANGE \`ano\` \`ano\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP COLUMN \`modelo\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD \`modelo\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP COLUMN \`marca\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD \`marca\` varchar(50) NULL`);
        await queryRunner.query(`CREATE INDEX \`veiculo_id\` ON \`ordem_servico\` (\`veiculo_id\`)`);
        await queryRunner.query(`CREATE INDEX \`funcionario_id\` ON \`ordem_servico\` (\`funcionario_id\`)`);
        await queryRunner.query(`CREATE INDEX \`cliente_id\` ON \`ordem_servico\` (\`cliente_id\`)`);
        await queryRunner.query(`CREATE INDEX \`servico_id\` ON \`item_ordem_servico\` (\`servico_id\`)`);
        await queryRunner.query(`CREATE INDEX \`ordem_id\` ON \`item_ordem_servico\` (\`ordem_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`placa\` ON \`veiculo\` (\`placa\`)`);
        await queryRunner.query(`CREATE INDEX \`cliente_id\` ON \`veiculo\` (\`cliente_id\`)`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD CONSTRAINT \`ordem_servico_ibfk_3\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD CONSTRAINT \`ordem_servico_ibfk_2\` FOREIGN KEY (\`veiculo_id\`) REFERENCES \`veiculo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD CONSTRAINT \`ordem_servico_ibfk_1\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD CONSTRAINT \`item_ordem_servico_ibfk_2\` FOREIGN KEY (\`servico_id\`) REFERENCES \`servico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD CONSTRAINT \`item_ordem_servico_ibfk_1\` FOREIGN KEY (\`ordem_id\`) REFERENCES \`ordem_servico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD CONSTRAINT \`veiculo_ibfk_1\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
