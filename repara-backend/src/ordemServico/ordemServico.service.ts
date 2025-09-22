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

  async findAll() {
    try {
      // Busca apenas os dados básicos primeiro
      const ordens = await this.repo.find();
      console.log('Ordens encontradas:', ordens.length);
      return ordens;
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
      // Se der erro, retorna array vazio
      return [];
    }
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
