import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateEstadoDto {
  @ApiProperty({
    description: 'Estado name',
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;
}
