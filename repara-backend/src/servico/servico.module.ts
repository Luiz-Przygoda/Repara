import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './servico.entity';
import { ServicosService } from './servico.service';
import { ServicosController } from './servico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  providers: [ServicosService],
  controllers: [ServicosController],
})
export class ServicoModule {}
