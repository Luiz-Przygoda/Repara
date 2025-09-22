import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Veiculo } from '../veiculo/veiculo.entity';
import { OrdemServico } from '../ordemServico/ordemServico.entity';

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  endereco: string;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cliente)
  veiculos: Veiculo[];

  // Relação com OrdemServico removida temporariamente
}