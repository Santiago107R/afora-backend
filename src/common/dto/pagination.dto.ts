import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { State } from '../../aula/interfaces/state-values';
import { ApiProperty } from '@nestjs/swagger';

const parseDate = (value: unknown) => {
  if (!value) return undefined;

  if (value instanceof Date) return value;

  if (typeof value === 'string') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  return undefined;
};

export class PaginationDto {
  @ApiProperty({
    description: 'Pagination Limit',
    nullable: true,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Pagination Offset',
    nullable: true,
  })
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @ApiProperty({
    description: 'Pagination Query',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    description: 'Pagination State',
    nullable: true,
  })
  @IsOptional()
  @IsIn(['available', 'busy', 'maintenance'])
  state?: State;

  @ApiProperty({
    description: 'Pagination Roles',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  roles?: string[];

  @ApiProperty({
    description: 'Filter by exact date (YYYY-MM-DD)',
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => parseDate(value))
  date?: Date;

  @ApiProperty({
    description: 'Filter by start time (HH:mm)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiProperty({
    description: 'Filter by end time (HH:mm)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiProperty({
    description: 'Filter by start date (YYYY-MM-DD)',
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => parseDate(value))
  startDate?: Date;

  @ApiProperty({
    description: 'Filter by end date (YYYY-MM-DD)',
    nullable: true,
  })
  @IsOptional()
  @Transform(({ value }) => parseDate(value))
  endDate?: Date;
}
