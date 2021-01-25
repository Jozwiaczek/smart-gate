import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    unique: true,
  })
  @Index()
  public email: string;

  @Column({
    type: 'varchar',
  })
  public password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public firstName: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public lastName: string | null;

  @Column({
    type: 'enum',
    array: true,
    nullable: true,
    enum: Role,
  })
  public roles: Array<Role>;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: number;
}
