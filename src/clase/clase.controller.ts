import { Body, Controller, Delete, Get, Param, Patch, Post, ParseUUIDPipe } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Clase } from './entities/clase.entity';
@ApiTags('Docente Aula')
@Controller('docente-aula')
export class ClaseController {
    constructor(private readonly docenteAulaService: ClaseService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'DocenteAula was created', type: () => Clase })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
    create(@Body() createClaseDto: CreateClaseDto) {
        return this.docenteAulaService.create(createClaseDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
    findAll() {
        return this.docenteAulaService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.docenteAulaService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateClaseDto: UpdateClaseDto,
    ) {
        return this.docenteAulaService.update(id, updateClaseDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.docenteAulaService.remove(id);
    }
}
