import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The ingrendient unique identifier',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
  })
  aisle: string;
}
