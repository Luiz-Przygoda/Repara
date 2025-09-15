import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from './veiculo.entity';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private repo: Repository<Veiculo>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['cliente'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['cliente'],
    });
  }

  create(data: Partial<Veiculo>) {
    const veiculo = this.repo.create(data);
    return this.repo.save(veiculo);
  }

  update(id: number, data: Partial<Veiculo>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
