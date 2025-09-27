import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrdemServico } from '../ordemServico/ordemServico.entity';
import { Servico } from '../servico/servico.entity';

@Entity('item_ordem_servico')
export class ItemOrdemServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrdemServico, (ordem) => ordem.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ordem_id' })
  ordem: OrdemServico;

  @ManyToOne(() => Servico, { eager: true, nullable: true })
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;

  @Column({ nullable: true })
  descricao: string;

  @Column({ default: 1 })
  quantidade: number;

  @Column('decimal', { name: 'valor_unitario', precision: 10, scale: 2, nullable: true })
  valorUnitario: number;
}
