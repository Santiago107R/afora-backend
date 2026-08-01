import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo {
  @ApiProperty({
    example: 1,
    description: 'Cargo ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'Docente',
    description: 'Cargo name',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => User, (user) => user.cargo)
  user: User[];
}
// un user tiene un cargo tiene fk
// un cargo tiene muchos users
