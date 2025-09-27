import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db.config';
import { ClienteModule } from './cliente/cliente.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ServicoModule } from './servico/servico.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { OrdemServicoModule } from './ordemServico/ordemServico.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ClienteModule,
    VeiculoModule,
    ServicoModule,
    FuncionarioModule,
    OrdemServicoModule,
  ],
})
export class AppModule {}
