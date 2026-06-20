import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Inject, forwardRef } from '@nestjs/common';
import { AulaService } from './aula.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AulaSocketGateway } from '../aula-socket/aula-socket.gateway';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Aula } from './entities/aula.entity';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Aulas')
@Controller('aula')
export class AulaController {
  constructor(
    private readonly aulaService: AulaService,
    @Inject(forwardRef(() => AulaSocketGateway))
    private readonly aulaSocketGateway: AulaSocketGateway,
  ) { }

  @Post()
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({ status: 201, description: 'Aula was created', type: () => Aula })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  async create(@Body() createAulaDto: CreateAulaDto) {
    const aula = await this.aulaService.create(createAulaDto);
    await this.aulaSocketGateway.broadcastAulas();
    return aula;
  }

  @Get()
  @Auth(ValidRoles.super_user, ValidRoles.admin, ValidRoles.user)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.aulaService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.super_user, ValidRoles.admin, ValidRoles.user)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.aulaService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.super_user, ValidRoles.admin, ValidRoles.supervisor)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAulaDto: UpdateAulaDto) {
    const aula = await this.aulaService.update(id, updateAulaDto);
    await this.aulaSocketGateway.broadcastAulas();
    return aula;
  }

  @Delete(':id')
  @Auth(ValidRoles.super_user, ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.aulaService.remove(id);
    await this.aulaSocketGateway.broadcastAulas();
    return result;
  }
}
