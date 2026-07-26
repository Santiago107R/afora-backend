import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estado {
    @ApiProperty({
        example: 1,
        description: 'Estado ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty({
        example: 'Disponible',
        description: 'Estado name',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    name: string
}
