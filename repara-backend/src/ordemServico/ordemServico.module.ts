import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServico } from './ordemServico.entity';
import { ItemOrdemServico } from '../itemOrdemServico/itemOrdemServico.entity';
import { OrdemServicoService } from './ordemServico.service';
import { OrdemServicoController } from './ordemServico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdemServico, ItemOrdemServico])],
  providers: [OrdemServicoService],
  controllers: [OrdemServicoController],
})
export class OrdemServicoModule {}
