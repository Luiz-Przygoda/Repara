import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './veiculo.entity';
import { VeiculosService } from './veiculo.service';
import { VeiculosController } from './veiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  providers: [VeiculosService],
  controllers: [VeiculosController],
})
export class VeiculoModule {}
