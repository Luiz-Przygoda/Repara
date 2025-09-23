import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('servico')
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;
}
