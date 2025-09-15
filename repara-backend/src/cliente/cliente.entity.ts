import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Veiculo } from '../veiculo/veiculo.entity';
import { OrdemServico } from '../ordemServico/ordemServico.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  endereco: string;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cliente)
  veiculos: Veiculo[];

  @OneToMany(() => OrdemServico, (ordem) => ordem.cliente)
  ordens: OrdemServico[];
}
