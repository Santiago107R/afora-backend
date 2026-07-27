import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreateClaseDto {
  @ApiProperty({
    description: 'User ID',
  })
  @IsUUID()
  id_user: string;

  @ApiProperty({
    description: 'Aula ID',
  })
  @IsUUID()
  id_aula: string;

  @ApiProperty({
    description: 'Curso ID',
  })
  @IsUUID()
  id_curso: string;

  @ApiProperty({
    description: 'Materia ID',
  })
  @IsUUID()
  id_materia: string;

  @ApiProperty({
    description: 'clase Day',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  day: string;

  @ApiProperty({
    example: '17:45',
    description: 'clase start time',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'startTime must be a valid time in HH:mm format',
  })
  startTime: string;

  @ApiProperty({
    example: '19:45',
    description: 'clase end time',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'endTime must be a valid time in HH:mm format',
  })
  endTime: string;
}
