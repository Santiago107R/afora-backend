import { Transform, Type } from "class-transformer"
import { IsArray, IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator"
import { State } from "../../aula/interfaces/state-values"

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number

    @IsOptional()
    @Type(() => Number)
    offset?: number

    @IsOptional()
    @IsString()
    query?: string;

    @IsOptional()
    @IsIn(['available', 'maintenance', 'busy'])
    state?: State

    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }) => typeof value === 'string' ? value.split(',') : value)
    roles?: string[];
}