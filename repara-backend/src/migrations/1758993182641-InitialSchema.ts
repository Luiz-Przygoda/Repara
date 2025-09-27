import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1758993182641 implements MigrationInterface {
    name = 'InitialSchema1758993182641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD UNIQUE INDEX \`IDX_a6a498ac4313a6bc4f8967c24d\` (\`placa\`)`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` CHANGE \`cliente_id\` \`cliente_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`telefone\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`telefone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`endereco\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`endereco\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`descricao\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`cargo\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`cargo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD \`descricao\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`quantidade\` \`quantidade\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`ordem_id\` \`ordem_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` ADD CONSTRAINT \`FK_08aa24ca0be223c0cc00b04a474\` FOREIGN KEY (\`cliente_id\`) REFERENCES \`cliente\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD CONSTRAINT \`FK_313c3160d6629c66cd389677be7\` FOREIGN KEY (\`ordem_id\`) REFERENCES \`ordem_servico\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD CONSTRAINT \`FK_6f8c73fa446332eca3c7852c411\` FOREIGN KEY (\`servico_id\`) REFERENCES \`servico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP FOREIGN KEY \`FK_6f8c73fa446332eca3c7852c411\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP FOREIGN KEY \`FK_313c3160d6629c66cd389677be7\``);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP FOREIGN KEY \`FK_08aa24ca0be223c0cc00b04a474\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`ordem_id\` \`ordem_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` CHANGE \`quantidade\` \`quantidade\` int NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`item_ordem_servico\` ADD \`descricao\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`ordem_servico\` ADD \`status\` enum ('aberta', 'em_andamento', 'concluida', 'cancelada') NULL DEFAULT 'aberta'`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`cargo\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`cargo\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`descricao\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`servico\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`servico\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`endereco\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`endereco\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`email\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`telefone\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`telefone\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` CHANGE \`cliente_id\` \`cliente_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`veiculo\` DROP INDEX \`IDX_a6a498ac4313a6bc4f8967c24d\``);
    }

}
