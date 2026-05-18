import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocenteAula } from '../../docente-aula/entities/docente-aula.entity';

@Entity()
export class Materia {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    name: string;

    @OneToMany(
        () => DocenteAula,
        (docenteAula) => docenteAula.materia,
    )
    docenteAula: DocenteAula[];
}
