import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: number;
}
