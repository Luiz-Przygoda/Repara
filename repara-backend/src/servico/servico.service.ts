import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Servico)
    private repo: Repository<Servico>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Servico>) {
    const servico = this.repo.create(data);
    return this.repo.save(servico);
  }

  update(id: number, data: Partial<Servico>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
