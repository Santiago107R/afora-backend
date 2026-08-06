import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { classroomType } from '../../common/utils/aforo.util';

export class CreateAulaDto {
  @ApiProperty({
    description: 'Aula Name',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Aula Description',
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;


  @ApiProperty({
    description: 'Aula square meters',
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  squareMeters: number;

  @ApiProperty({
    description: 'Aula meters high',
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  heightInMeters: number;

  @ApiProperty({
    description: 'Aula type of classroom',
  })
  @IsIn(["inicial", "primaria", "secundaria", "taller"])
  classroomType: classroomType;

  @ApiProperty({
    description: 'Aula deduct space per teacher',
    minimum: 5,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  deductTeacherSpace?: number;

  @ApiProperty({
    description: 'Aula Capacity',
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  capacity: number;

  @ApiProperty({
    example: 1,
    description: 'ID del estado del aula',
    default: 1,
  })
  @IsOptional()
  @IsPositive()
  id_estado?: number;
}
