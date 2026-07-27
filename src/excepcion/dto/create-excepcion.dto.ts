import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';

export class CreateExcepcionDto {
  @ApiProperty({
    description: 'Clase ID',
  })
  @IsUUID()
  id_clase: string;

  @ApiProperty({
    description: 'Excepcion Date',
  })
  @IsDate()
  date: Date;

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
}
