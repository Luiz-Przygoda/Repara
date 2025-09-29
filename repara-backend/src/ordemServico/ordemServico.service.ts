import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServico } from './ordemServico.entity';
import { ItemOrdemServico } from '../itemOrdemServico/itemOrdemServico.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Servico } from '../servico/servico.entity';

@Injectable()
export class OrdemServicoService {
  constructor(
    @InjectRepository(OrdemServico)
    private repo: Repository<OrdemServico>,
    @InjectRepository(ItemOrdemServico)
    private itemRepo: Repository<ItemOrdemServico>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Veiculo)
    private veiculoRepo: Repository<Veiculo>,
    @InjectRepository(Funcionario)
    private funcionarioRepo: Repository<Funcionario>,
    @InjectRepository(Servico)
    private servicoRepo: Repository<Servico>,
  ) {}

  async findAll() {
    try {
      const ordens = await this.repo.find({
        relations: [
          'cliente',
          'veiculo',
          'funcionario',
          'itens',
          'itens.servico'
        ],
      });
      return ordens;
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
      return [];
    }
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['itens'],
    });
  }

  async create(data: any) {
    try {
      // Buscar as entidades relacionadas
      const cliente = await this.clienteRepo.findOne({ where: { id: data.clienteId } });
      const veiculo = await this.veiculoRepo.findOne({ where: { id: data.veiculoId } });
      const funcionario = await this.funcionarioRepo.findOne({ where: { id: data.funcionarioId } });

      if (!cliente || !veiculo || !funcionario) {
        throw new Error('Cliente, veículo ou funcionário não encontrado');
      }

      // Criar a ordem de serviço
      const ordem = this.repo.create({
        cliente,
        veiculo,
        funcionario,
        status: data.status || 'aberta',
        observacoes: data.observacoes,
        dataAbertura: new Date()
      });

      const ordemSalva = await this.repo.save(ordem);

      // Criar os itens da ordem de serviço
      if (data.servicoIds && data.servicoIds.length > 0) {
        for (const servicoId of data.servicoIds) {
          const servico = await this.servicoRepo.findOne({ where: { id: servicoId } });
          if (servico) {
            const item = this.itemRepo.create({
              ordem: ordemSalva,
              servico,
              quantidade: 1,
              valorUnitario: servico.preco || 0
            });
            await this.itemRepo.save(item);
          }
        }
      }

      return ordemSalva;
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      throw error;
    }
  }

  update(id: number, data: Partial<OrdemServico>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
