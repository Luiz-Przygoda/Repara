import { Cliente } from './cliente/cliente.entity';
import { Veiculo } from './veiculo/veiculo.entity';
import { Servico } from './servico/servico.entity';
import { Funcionario } from './funcionario/funcionario.entity';
import { OrdemServico } from './ordemServico/ordemServico.entity';
import { ItemOrdemServico } from './itemOrdemServico/itemOrdemServico.entity';

export const dbConfig = {
  type: 'mysql' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'repara-api',
  entities: [Cliente, Veiculo, Servico, Funcionario, OrdemServico, ItemOrdemServico],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  // Render specific configuration
  ...(process.env.DATABASE_URL && {
    url: process.env.DATABASE_URL,
  }),
};
