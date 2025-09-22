import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/cliente.entity';
import { Veiculo } from './veiculo/veiculo.entity';
import { Servico } from './servico/servico.entity';
import { Funcionario } from './funcionario/funcionario.entity';
import { OrdemServico } from './ordemServico/ordemServico.entity';
import { ItemOrdemServico } from './itemOrdemServico/itemOrdemServico.entity';
import { ClienteModule } from './cliente/cliente.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ServicoModule } from './servico/servico.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { OrdemServicoModule } from './ordemServico/ordemServico.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'repara-api',
      synchronize: false, 
      entities: [Cliente, Veiculo, Servico, Funcionario, OrdemServico, ItemOrdemServico],
    }),
    ClienteModule,
    VeiculoModule,
    ServicoModule,
    FuncionarioModule,
    OrdemServicoModule,
  ],
})
export class AppModule {}
