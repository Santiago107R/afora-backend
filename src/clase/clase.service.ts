import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Clase } from './entities/clase.entity';
import { User } from '../auth/entities/user.entity';
import { Aula } from '../aula/entities/aula.entity';
import { Curso } from '../curso/entities/curso.entity';
import { handleError } from '../common/utils/handle-errors';
import { Materia } from '../materia/entities/materia.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,

    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async create(createClaseDto: CreateClaseDto) {
    const { id_user, id_aula, id_curso, id_materia, ...rest } = createClaseDto;

    const [user, aula, curso, materia] = await Promise.all([
      this.userRepository.findOneBy({ id: id_user }),
      this.aulaRepository.findOneBy({ id: id_aula }),
      this.cursoRepository.findOneBy({ id: id_curso }),
      this.materiaRepository.findOneBy({ id: id_materia }),
    ]);

    if (!user)
      throw new BadRequestException(`User no encontrado con id ${id_user}`);
    if (!user.roles?.includes('user')) {
      throw new BadRequestException('El usuario no tiene rol user');
    }
    if (!aula)
      throw new BadRequestException(`Aula no encontrada con id ${id_aula}`);
    if (!curso)
      throw new BadRequestException(`Curso no encontrado con id ${id_curso}`);
    if (!materia)
      throw new BadRequestException(
        `Materia no encontrado con id ${id_materia}`,
      );

    const clase = this.claseRepository.create({
      user,
      aula,
      curso,
      materia,
      ...rest,
    });

    try {
      await this.claseRepository.save(clase);
      return clase;
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, startTime, endTime } = paginationDto;

    const where: Record<string, any> = {};

    if (startTime || endTime) {
      if (startTime && endTime) {
        where.startTime = Between(startTime, endTime);
        where.endTime = Between(startTime, endTime);
      } else if (startTime) {
        where.startTime = MoreThanOrEqual(startTime);
      } else if (endTime) {
        where.endTime = LessThanOrEqual(endTime);
      }
    }

    const [clases, total] = await this.claseRepository.findAndCount({
      take: limit,
      skip: offset,
      where,
    });

    const pages = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      total,
      pages,
      clases,
    };
  }

  async findOne(id: string) {
    const clase = await this.claseRepository.findOne({ where: { id } });

    if (!clase)
      throw new NotFoundException(`Registro clase con id ${id} no encontrado`);

    return clase;
  }

  async update(id: string, updateClaseDto: UpdateClaseDto) {
    const { id_user, id_aula, id_curso, id_materia, ...rest } = updateClaseDto;

    let user: User | null = null;
    let aula: Aula | null = null;
    let curso: Curso | null = null;
    let materia: Materia | null = null;

    if (id_user) {
      user = await this.userRepository.findOneBy({ id: id_user });
      if (!user)
        throw new NotFoundException(`User no encontrado con id ${id_user}`);
      if (!user.roles?.includes('user')) {
        throw new BadRequestException('El usuario no tiene rol user');
      }
    }

    if (id_aula) {
      aula = await this.aulaRepository.findOneBy({ id: id_aula });
      if (!aula)
        throw new BadRequestException(`Aula no encontrada con id ${id_aula}`);
    }

    if (id_curso) {
      curso = await this.cursoRepository.findOneBy({ id: id_curso });
      if (!curso)
        throw new BadRequestException(`Curso no encontrado con id ${id_curso}`);
    }

    if (id_materia) {
      materia = await this.materiaRepository.findOneBy({ id: id_materia });
      if (!materia)
        throw new BadRequestException(
          `Materia no encontrado con id ${id_materia}`,
        );
    }

    const clase = await this.claseRepository.preload({
      id,
      ...rest,
      ...(user ? { user } : {}),
      ...(aula ? { aula } : {}),
      ...(curso ? { curso } : {}),
      ...(materia ? { materia } : {}),
    });

    if (!clase)
      throw new NotFoundException(`Registro clase con id ${id} no encontrado`);

    try {
      await this.claseRepository.save(clase);
      return clase;
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string) {
    const clase = await this.findOne(id);
    await this.claseRepository.remove(clase);
    return 'DELETED SUCCESSFULLY';
  }
}
