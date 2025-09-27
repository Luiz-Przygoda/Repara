import { Cliente } from './cliente/cliente.entity';
import { Veiculo } from './veiculo/veiculo.entity';
import { Servico } from './servico/servico.entity';
import { Funcionario } from './funcionario/funcionario.entity';
import { OrdemServico } from './ordemServico/ordemServico.entity';
import { ItemOrdemServico } from './itemOrdemServico/itemOrdemServico.entity';

export const dbConfig = {
  type: 'mysql' as const,
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'mysql',
  database: 'repara-api',
  entities: [Cliente, Veiculo, Servico, Funcionario, OrdemServico, ItemOrdemServico],
  migrations: ['src/migrations/*.js'],
  synchronize: false,
  logging: true,
};
