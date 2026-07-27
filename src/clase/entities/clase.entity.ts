import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Aula } from '../../aula/entities/aula.entity';
import { Curso } from '../../curso/entities/curso.entity';
import { Materia } from '../../materia/entities/materia.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Excepcion } from 'src/excepcion/entities/excepcion.entity';

@Entity()
export class Clase {
  @ApiProperty({
    example: 'e4809c2f-d26d-44ea-9f58-d15dba3cd3ac',
    description: 'Clase ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ApiProperty({
    example: '8c7fec6d-7d5a-4225-807a-8f0ccbd755a5',
    description: 'Curso ID',
  })
  @ManyToOne(() => Curso, (curso) => curso.clase, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @ApiProperty({
    example: '3704cbd5-b1d5-40e2-9e34-2549a8e83e12',
    description: 'Materia ID',
  })
  @ManyToOne(() => Materia, (materia) => materia.clase, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_materia' })
  materia: Materia;

  @ApiProperty({
    example: 'Lunes',
    description: 'clase Day',
  })
  @Column('text')
  day: string;

  // @ApiProperty({
  //     example: '17:45-19:45',
  //     description: 'clase Schedule',
  // })
  // @Column('text')
  // schedule: string;

  @ApiProperty({
    example: '17:45',
    description: 'clase start time',
    format: 'time',
  })
  @Column('time')
  startTime: string;

  @ApiProperty({
    example: '19:45',
    description: 'clase end time',
    format: 'time',
  })
  @Column('time')
  endTime: string;

  @OneToMany(() => Excepcion, (excepcion) => excepcion.clase)
  excepcion: Excepcion;
}
