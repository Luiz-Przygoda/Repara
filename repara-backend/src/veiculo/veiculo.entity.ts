import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';

@Entity('veiculos')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column({ unique: true })
  placa: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.veiculos, { onDelete: 'CASCADE' })
  cliente: Cliente;
}
