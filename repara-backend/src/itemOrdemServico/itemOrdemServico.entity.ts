import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrdemServico } from '../ordemServico/ordemServico.entity';
import { Servico } from '../servico/servico.entity';

@Entity('itensordemservico')
export class ItemOrdemServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrdemServico, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordemId' })
  ordem: OrdemServico;

  @ManyToOne(() => Servico, { eager: true, nullable: true })
  @JoinColumn({ name: 'servicoId' })
  servico: Servico;

  @Column({ nullable: true })
  descricao: string;

  @Column({ default: 1 })
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  valorUnitario: number;
}
