import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { ILike, Repository } from 'typeorm';
import { handleError } from 'src/common/utils/handle-errors';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class EstadoService {

  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>
  ) { }

  async create(createEstadoDto: CreateEstadoDto) {
    const estado = this.estadoRepository.create(createEstadoDto)

    const nameAlreadyExist = await this.estadoRepository.findOneBy({ name: estado.name })

    if (nameAlreadyExist) throw new BadRequestException(`name ${estado.name} already exists`)

    try {

      await this.estadoRepository.save(estado)

      return this.findOne(estado.id)
    } catch (error) {
      handleError(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, query = undefined } = paginationDto

    const [estados, total] = await this.estadoRepository.findAndCount({
      take: limit,
      skip: offset,
      where: {
        name: query ? ILike(`%${query}%`) : undefined
      }
    })

    const pages = limit > 0 ? Math.ceil(total / limit) : 1

    return {
      total,
      pages,
      estados
    }
  }

  async findOne(id: number) {
    const estado = await this.estadoRepository.findOneBy({ id })

    if (!estado) throw new NotFoundException(`Estado with id ${id} not found`)

    return estado
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto) {
    const estado = await this.estadoRepository.preload({
      id,
      ...updateEstadoDto
    })

    if (!estado) throw new NotFoundException(`Estado with id ${id} not found`)

    try {
      await this.estadoRepository.save(estado)

      return this.findOne(id)
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    const estado = await this.findOne(id)

    await this.estadoRepository.remove(estado)

    return "DELETED SUCCESSFULLY"
  }
}
