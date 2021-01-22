import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/role.enum';

@Entity('user')
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

  // TODO: Add @OneToMany relation with Roles entity
  @Column({
    type: 'varchar',
    enum: Role,
  })
  public roles: Role;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: number;
}
