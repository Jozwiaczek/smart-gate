import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class ConfigEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: number;

  @Column({
    type: 'varchar',
  })
  public value: string;
}
