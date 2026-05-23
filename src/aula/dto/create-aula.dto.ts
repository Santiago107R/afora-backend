import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";
import { State } from "../interfaces/state-values";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAulaDto {
    @ApiProperty({
        description: 'Aula name',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        description: 'Aula description',
        nullable: true,
        minLength: 1,
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    description?: string;

    @ApiProperty({
        description: 'Aula capacity',
        minimum: 1,
    })
    @IsNumber()
    @IsPositive()
    @Min(1)
    capacity: number;

    @ApiProperty({
        description: 'Aula state',
        default: State.AVAILABLE,
    })
    @IsOptional()
    @IsIn(['available', 'unavailable', 'busy'])
    state?: State;
}