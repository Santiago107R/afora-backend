import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ILike, Repository } from 'typeorm';
import { Aula } from './entities/aula.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { handleError } from '../common/utils/handle-errors';
import { Estado } from '../estado/entities/estado.entity';
import { calcularAforoAula } from '../common/utils/aforo.util';

@Injectable()
export class AulaService {
  constructor(
    @InjectRepository(Aula)
    private readonly AulaRepository: Repository<Aula>,

    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) { }

  async create(createAulaDto: CreateAulaDto) {
    const { id_estado = 1, ...datosDelAula } = createAulaDto;

    const capacity = calcularAforoAula({
      squareMeters: createAulaDto.squareMeters,
      heightInMeters: createAulaDto.heightInMeters,
      classroomType: createAulaDto.classroomType,
      deductTeacherSpace: createAulaDto.deductTeacherSpace,
    });

    const estado = await this.estadoRepository.findOneBy({ id: id_estado });
    if (!estado) {
      throw new NotFoundException(`Estado with id ${id_estado} not found`);
    }

    const aula = this.AulaRepository.create({
      ...datosDelAula,
      estado,
      capacity,
    });

    try {
      await this.AulaRepository.save(aula);
      return this.findOne(aula.id);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit = 10,
      offset = 0,
      state = undefined,
      query = undefined,
    } = paginationDto;

    const where: any = {};

    if (state !== undefined) {
      where.estado = {
        name: state,
      };
    }

    if (query !== undefined) {
      where.name = ILike(`%${query}%`);
    }

    try {
      const [aulas, total] = await this.AulaRepository.findAndCount({
        take: limit,
        skip: offset,
        relations: {
          clase: true,
          estado: true,
        },
        where,
      });

      const pages = limit > 0 ? Math.ceil(total / limit) : 0;

      return {
        total,
        pages,
        aulas,
      };
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: string) {
    const aula = await this.AulaRepository.findOne({
      where: { id },
      relations: {
        clase: true,
        estado: true,
      },
    });

    if (!aula) throw new NotFoundException(`Aula with id ${id} not found`);

    return aula;
  }

  async update(id: string, updateAulaDto: UpdateAulaDto) {
    const { id_estado, ...rest } = updateAulaDto;

    const estado = await this.estadoRepository.findOneBy({ id: id_estado });

    if (!estado)
      throw new NotFoundException(`Estado with id ${id_estado} not found`);

    const aula = await this.AulaRepository.preload({ id, estado, ...rest });

    if (!aula) throw new NotFoundException(`Aula with id ${id} not found`);

    try {
      await this.AulaRepository.save(aula);

      return this.findOne(id);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string) {
    const aula = await this.findOne(id);

    await this.AulaRepository.remove(aula);

    return `DELETE HAS BEEN SUCCESSFUL`;
  }

  async deleteAllRegisters() {
    const query = this.AulaRepository.createQueryBuilder('aula');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleError(error);
    }
  }
}
