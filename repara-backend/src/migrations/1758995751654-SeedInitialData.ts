import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1758995751654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO cliente (nome, telefone, email, endereco) VALUES
            ('João da Silva', '48999990001', 'joao.silva@email.com', 'Rua das Flores, 123'),
            ('Maria Oliveira', '48999990002', 'maria.oliveira@email.com', 'Av. Brasil, 456'),
            ('Carlos Pereira', '48999990003', 'carlos.pereira@email.com', 'Rua Central, 789');
        `);

        await queryRunner.query(`
            INSERT INTO veiculo (cliente_id, marca, modelo, ano, placa) VALUES
            (1, 'Fiat', 'Uno', '2018-01-01', 'ABC1234'),
            (2, 'Volkswagen', 'Gol', '2020-05-15', 'XYZ5678'),
            (1, 'Toyota', 'Corolla', '2019-08-20', 'DEF9012');
        `);

        await queryRunner.query(`
            INSERT INTO servico (nome, descricao, preco) VALUES
            ('Troca de óleo', 'Substituição do óleo do motor e filtro', 150.00),
            ('Alinhamento e balanceamento', 'Serviço de alinhamento e balanceamento de rodas', 200.00),
            ('Revisão completa', 'Revisão geral com checagem de 30 itens', 600.00),
            ('Troca de pastilhas de freio', 'Substituição das pastilhas de freio dianteiras', 300.00);
        `);

        await queryRunner.query(`
            INSERT INTO funcionario (nome, cargo) VALUES
            ('Pedro Souza', 'Mecânico'),
            ('Ana Lima', 'Atendente'),
            ('Roberto Martins', 'Mecânico');
        `);

        await queryRunner.query(`
            INSERT INTO ordem_servico (cliente_id, veiculo_id, funcionario_id, status, observacoes) VALUES
            (1, 1, 1, 'em_andamento', 'Cliente relatou barulho no motor'),
            (2, 2, 3, 'aberta', 'Troca de pastilhas de freio solicitada'),
            (3, 3, 1, 'concluida', 'Revisão periódica realizada com sucesso');
        `);

        await queryRunner.query(`
            INSERT INTO item_ordem_servico (ordem_id, servico_id, descricao, quantidade, valor_unitario) VALUES
            (1, 1, NULL, 1, 150.00),
            (1, 2, NULL, 1, 200.00),
            (2, 4, NULL, 1, 300.00),
            (3, 3, NULL, 1, 600.00),
            (3, NULL, 'Fluido de freio DOT4', 2, 35.00);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM item_ordem_servico`);
        await queryRunner.query(`DELETE FROM ordem_servico`);
        await queryRunner.query(`DELETE FROM funcionario`);
        await queryRunner.query(`DELETE FROM servico`);
        await queryRunner.query(`DELETE FROM veiculo`);
        await queryRunner.query(`DELETE FROM cliente`);
    }
}