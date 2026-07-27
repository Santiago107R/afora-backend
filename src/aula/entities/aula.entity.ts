import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Clase } from '../../clase/entities/clase.entity';
import { Estado } from 'src/estado/entities/estado.entity';

@Entity()
export class Aula {
  @ApiProperty({
    example: '691cc02d-bc74-46f5-8e81-2233102e7a1a',
    description: 'Aula ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Sala Grande',
    description: 'Aula name',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: 'Sala de computadoras',
    description: 'Aula description',
    nullable: true,
  })
  @Column('text', {
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 30,
    description: 'Aula capacity',
  })
  @Column('int')
  capacity: number;

  @ApiProperty({
    example: 30,
    description: 'Aula state',
  })
  @ManyToOne(() => Estado, (estado) => estado.aula, {
    eager: true,
    nullable: false,
  })
  estado: Estado;

  @OneToMany(() => Clase, (clase) => clase.aula)
  clase: Clase[];
}
