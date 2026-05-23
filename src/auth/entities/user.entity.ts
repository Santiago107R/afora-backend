import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DocenteAula } from '../../docente-aula/entities/docente-aula.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({
        example: '960c1cca-ecea-4737-a153-1cd83f88685b',
        description: 'User ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Santiago Robles',
        description: 'User Name',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    name: string;

    @ApiProperty({
        example: '$2b$10$eWx68Vzla0MsFf18AojsMuhp7o2hdkQQpHWEnOocVl70B3JJ9zEqq',
        description: 'User Password',
        nullable: false,
    })
    @Column('text', {
        select: false,
    })
    password: string;

    @ApiProperty({
        example: '49675829',
        description: 'User DNI',
        nullable: true,
    })
    @Column('int', {
        nullable: true,
    })
    DNI?: number;

    @ApiProperty({
        example: 'admin, docente',
        description: 'User Roles',
    })
    @Column('text', {
        array: true,
    })
    roles: string[];

    @ApiProperty({
        example: true,
        description: 'User isActive (this is to ban users)',
        default: true,
    })
    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @OneToMany(
        () => DocenteAula,
        (docenteAula) => docenteAula.user
    )
    docenteAula: DocenteAula[];

}