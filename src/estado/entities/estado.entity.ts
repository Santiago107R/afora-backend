import { ApiProperty } from '@nestjs/swagger';
import { Aula } from 'src/aula/entities/aula.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estado {
  @ApiProperty({
    example: 1,
    description: 'Estado ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: 'Disponible',
    description: 'Estado name',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  name: string;

  @OneToMany(() => Aula, (aula) => aula.estado)
  aula: Aula[];
}
