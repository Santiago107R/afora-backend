import { ApiProperty } from '@nestjs/swagger';
import { Aula } from 'src/aula/entities/aula.entity';
import { User } from 'src/auth/entities/user.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Excepcion {
  @ApiProperty({
    example: '691cc02d-d26d-45ea-9f58-1cd83f88685b',
    description: 'Excepcion ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'e4809c2f-d26d-44ea-9f58-d15dba3cd3ac',
    description: 'Clase ID',
  })
  @ManyToOne(() => Clase, (clase) => clase.excepcion, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_clase' })
  clase: Clase;

  @ApiProperty({
    example: '2026-06-12',
    description: 'Excepcion Date',
  })
  @Column('date')
  date: Date;

  @ApiProperty({
    example: '960c1cca-ecea-4737-a153-1cd83f88685b',
    description: 'User ID',
  })
  @ManyToOne(() => User, (user) => user.clase, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ApiProperty({
    example: '691cc02d-bc74-46f5-8e81-2233102e7a1a',
    description: 'Aula ID',
  })
  @ManyToOne(() => Aula, (aula) => aula.clase, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_aula' })
  aula: Aula;
}
