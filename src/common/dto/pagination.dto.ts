import { Transform, Type } from "class-transformer"
import { IsArray, IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator"
import { State } from "src/aula/interfaces/state-values"

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
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (!value) return undefined;

        //! ?roles=admin&roles=docente)
        if (Array.isArray(value)) return value;

        //! ?roles=admin,docente
        if (typeof value === 'string' && value.includes(',')) {
            return value.split(',');
        }

        return [value];
    })
    roles?: string[];
}