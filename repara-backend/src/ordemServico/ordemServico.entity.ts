import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { ItemOrdemServico } from '../itemOrdemServico/itemOrdemServico.entity';

@Entity('ordem_servico')
export class OrdemServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Veiculo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veiculo_id' })
  veiculo: Veiculo;

  @ManyToOne(() => Funcionario, { nullable: true })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @Column({ name: 'data_abertura', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataAbertura: Date;

  @Column({ name: 'data_fechamento', type: 'datetime', nullable: true })
  dataFechamento: Date;

  @Column({ type: 'enum', enum: ['aberta', 'em_andamento', 'concluida', 'cancelada'], default: 'aberta' })
  status: string;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @OneToMany(() => ItemOrdemServico, (item) => item.ordem)
  itens: ItemOrdemServico[];
}
