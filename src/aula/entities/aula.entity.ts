import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../interfaces/state-values";
import { ApiProperty } from "@nestjs/swagger";
import { Clase } from "../../clase/entities/clase.entity";

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
        nullable: true
    })
    description?: string;

    @ApiProperty({
        example: 30,
        description: 'Aula capacity',
    })
    @Column('int')
    capacity: number;

    @ApiProperty({
        example: 'available',
        description: 'Aula state',
        default: State.AVAILABLE,
    })
    @Column('enum', {
        enum: State,
        default: State.AVAILABLE
    })
    state: State;

    @OneToMany(
        () => Clase,
        (clase) => clase.aula,
    )
    clase: Clase[];
}