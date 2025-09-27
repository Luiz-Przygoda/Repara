import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrdemServico } from '../ordemServico/ordemServico.entity';

@Entity('funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  cargo: string;

  @OneToMany(() => OrdemServico, (ordem) => ordem.funcionario)
  ordens: OrdemServico[];
}
