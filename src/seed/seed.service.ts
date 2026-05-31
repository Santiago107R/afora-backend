import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { ConfigService } from '@nestjs/config';
import { AulaService } from '../aula/aula.service';
import { AuthService } from '../auth/auth.service';
import { MateriaService } from '../materia/materia.service';
import { CursoService } from '../curso/curso.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly aulaService: AulaService,
    private readonly cursoService: CursoService,
    private readonly authService: AuthService,
    private readonly materiaService: MateriaService,

    private readonly configService: ConfigService
  ) { }

  async runSeed() {
    await this.deleteTables();

    await this.insertUsers();
    await this.insertAulas();
    await this.insertCursos();
    await this.insertMaterias();

    return 'SEED EXECUTED SUCCESSFULLY';
  }

  private async deleteTables() {
    await this.aulaService.deleteAllRegisters();
    await this.cursoService.deleteAllRegisters();
    await this.materiaService.deleteAllRegisters();
    await this.authService.deleteAllRegisters();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    await Promise.all(
      seedUsers.map(user => this.authService.create(user))
    );

    return true;
  }

  private async insertAulas() {
    const seedAulas = initialData.aulas;

    await Promise.all(
      seedAulas.map(aula => this.aulaService.create(aula))
    );

    return true;
  }

  private async insertCursos() {
    const seedCursos = initialData.cursos;

    await Promise.all(
      seedCursos.map(curso => this.cursoService.create(curso))
    );

    return true;
  }

  private async insertMaterias() {
    const seedMaterias = initialData.materias;

    await Promise.all(
      seedMaterias.map(materia => this.materiaService.create(materia))
    );

    return true;
  }

  
}