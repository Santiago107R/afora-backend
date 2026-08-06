import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExcepcionDto } from './dto/create-excepcion.dto';
import { UpdateExcepcionDto } from './dto/update-excepcion.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Excepcion } from './entities/excepcion.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Clase } from '../clase/entities/clase.entity';
import { User } from '../auth/entities/user.entity';
import { Aula } from '../aula/entities/aula.entity';
import { handleError } from '../common/utils/handle-errors';

@Injectable()
export class ExcepcionService {
  constructor(
    @InjectRepository(Excepcion)
    private readonly excepcionRepository: Repository<Excepcion>,

    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,
  ) { }

  async create(createExcepcionDto: CreateExcepcionDto) {
    const { id_clase, id_user, id_aula, ...rest } = createExcepcionDto;

    const [clase, user, aula] = await Promise.all([
      this.claseRepository.findOneBy({ id: id_clase }),
      this.userRepository.findOneBy({ id: id_user }),
      this.aulaRepository.findOneBy({ id: id_aula }),
    ]);

    if (!clase)
      throw new NotFoundException(`Clase with id "${id_clase}" not found`);

    if (!user)
      throw new NotFoundException(`User with id "${id_user}" not found`);

    if (!aula)
      throw new NotFoundException(`Aula with id "${id_aula}" not found`);

    const exception = this.excepcionRepository.create({
      clase,
      user,
      aula,
      ...rest,
    });

    try {
      await this.excepcionRepository.save(exception);

      return exception;
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, date, startDate, endDate } = paginationDto;

    const where: Record<string, any> = {};

    if (date) {
      where.date = date;
    }

    if (startDate || endDate) {
      if (startDate && endDate) {
        where.date = Between(startDate, endDate);
      } else if (startDate) {
        where.date = MoreThanOrEqual(startDate);
      } else if (endDate) {
        where.date = LessThanOrEqual(endDate);
      }
    }

    const [excepciones, total] = await this.excepcionRepository.findAndCount({
      take: limit,
      skip: offset,
      where,
    });

    const pages = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      total,
      pages,
      excepciones,
    };
  }

  async findOne(id: string) {
    const excepcion = await this.excepcionRepository.findOneBy({ id });

    if (!excepcion)
      throw new NotFoundException(`Excepcion with id '${id}' not foun`);

    return excepcion;
  }

  async update(id: string, updateExcepcionDto: UpdateExcepcionDto) {
    const { id_clase, id_user, id_aula, ...rest } = updateExcepcionDto;

    let clase: Clase | null = null;
    let user: User | null = null;
    let aula: Aula | null = null;

    if (id_clase) {
      clase = await this.claseRepository.findOneBy({ id: id_clase });
      if (!clase) throw new NotFoundException(`Clase with id '${id}' not foun`);
    }

    if (id_user) {
      user = await this.userRepository.findOneBy({ id: id_user });
      if (!user) throw new NotFoundException(`User with id '${id}' not foun`);
    }

    if (id_aula) {
      aula = await this.aulaRepository.findOneBy({ id: id_aula });
      if (!aula) throw new NotFoundException(`Aula with id '${id}' not foun`);
    }

    const excepcion = await this.excepcionRepository.preload({
      id,
      ...rest,
      ...(clase ? { clase } : {}),
      ...(user ? { user } : {}),
      ...(aula ? { aula } : {}),
    });

    if (!excepcion)
      throw new NotFoundException(`Excepcion with id '${id}' not foun`);

    try {
      await this.excepcionRepository.save(excepcion);
      return excepcion;
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string) {
    const exception = await this.findOne(id);
    await this.excepcionRepository.remove(exception);
    return 'DELETED SUCCESSFULLY';
  }
}
