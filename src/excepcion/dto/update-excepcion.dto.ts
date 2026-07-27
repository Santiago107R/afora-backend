import { PartialType } from '@nestjs/swagger';
import { CreateExcepcionDto } from './create-excepcion.dto';

export class UpdateExcepcionDto extends PartialType(CreateExcepcionDto) {}
