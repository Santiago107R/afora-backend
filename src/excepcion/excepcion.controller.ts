import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExcepcionService } from './excepcion.service';
import { CreateExcepcionDto } from './dto/create-excepcion.dto';
import { UpdateExcepcionDto } from './dto/update-excepcion.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidRoles } from '../auth/interfaces';
import { Auth } from '../auth/decorators';
import { Excepcion } from './entities/excepcion.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Excepcion')
@Controller('excepcion')
export class ExcepcionController {
  constructor(private readonly excepcionService: ExcepcionService) { }

  @Post()
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({
    status: 201,
    description: 'Estado was created',
    type: () => Excepcion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  create(@Body() createExcepcionDto: CreateExcepcionDto) {
    return this.excepcionService.create(createExcepcionDto);
  }

  @Get()
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.excepcionService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.excepcionService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  update(
    @Param('id') id: string,
    @Body() updateExcepcionDto: UpdateExcepcionDto,
  ) {
    return this.excepcionService.update(id, updateExcepcionDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  remove(@Param('id') id: string) {
    return this.excepcionService.remove(id);
  }
}
