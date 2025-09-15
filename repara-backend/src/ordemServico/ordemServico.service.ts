import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServico } from './ordemServico.entity';

@Injectable()
export class OrdemServicoService {
  constructor(
    @InjectRepository(OrdemServico)
    private repo: Repository<OrdemServico>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['itens'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['itens'],
    });
  }

  create(data: Partial<OrdemServico>) {
    const ordem = this.repo.create(data);
    return this.repo.save(ordem);
  }

  update(id: number, data: Partial<OrdemServico>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
