import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { ILike, Repository } from 'typeorm';
import { handleError } from 'src/common/utils/handle-errors';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async create(createCargoDto: CreateCargoDto) {
    const cargo = this.cargoRepository.create(createCargoDto);

    const nameAlreadyExist = await this.cargoRepository.findOneBy({
      name: cargo.name,
    });

    if (nameAlreadyExist)
      throw new BadRequestException(
        `Cargo with name '${cargo.name}' already exist`,
      );

    try {
      await this.cargoRepository.save(cargo);

      return cargo;
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, query = undefined } = paginationDto;

    const [cargos, total] = await this.cargoRepository.findAndCount({
      take: limit,
      skip: offset,
      where: {
        name: query ? ILike(`%${query}%`) : undefined,
      },
    });

    const pages = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      total,
      pages,
      cargos,
    };
  }

  async findOne(id: number) {
    const cargo = await this.cargoRepository.findOneBy({ id });

    if (!cargo) throw new NotFoundException(`Cargo with id ${id} not found`);

    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    const cargo = await this.cargoRepository.preload({
      id,
      ...updateCargoDto,
    });

    if (!cargo) throw new NotFoundException(`Cargo with id '${id}' not found`);

    try {
      await this.cargoRepository.save(cargo);

      return cargo;
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    const cargo = await this.findOne(id);

    await this.cargoRepository.remove(cargo);

    return 'DELETED SUCCESSFULLY';
  }
}
