import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServico } from './ordemServico.entity';
import { ItemOrdemServico } from '../itemOrdemServico/itemOrdemServico.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Servico } from '../servico/servico.entity';
import { OrdemServicoService } from './ordemServico.service';
import { OrdemServicoController } from './ordemServico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrdemServico, 
    ItemOrdemServico, 
    Cliente, 
    Veiculo, 
    Funcionario, 
    Servico
  ])],
  providers: [OrdemServicoService],
  controllers: [OrdemServicoController],
})
export class OrdemServicoModule {}
