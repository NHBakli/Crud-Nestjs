import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['breakfast', 'lunch', 'dinner'] })
  type: string;

  @Column('simple-array')
  ingredients: string[];

  @Column('text')
  instructions: string;
}
