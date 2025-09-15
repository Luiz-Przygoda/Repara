import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { ItemOrdemServico } from '../itemOrdemServico/itemOrdemServico.entity';

@Entity('ordemServico') 
export class OrdemServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.ordens, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Veiculo, { eager: true })
  veiculo: Veiculo;

  @ManyToOne(() => Funcionario, { nullable: true, eager: true })
  funcionario: Funcionario;

  @CreateDateColumn()
  dataAbertura: Date;

  @UpdateDateColumn()
  dataFechamento: Date;

  @Column({
    type: 'enum',
    enum: ['aberta', 'emAndamento', 'concluida', 'cancelada'],
    default: 'aberta',
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @OneToMany(() => ItemOrdemServico, (item) => item.ordem, { cascade: true })
  itens: ItemOrdemServico[];
}
