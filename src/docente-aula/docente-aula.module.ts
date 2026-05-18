import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteAula } from './entities/docente-aula.entity';
import { User } from '../auth/entities/user.entity';
import { Aula } from '../aula/entities/aula.entity';
import { Curso } from '../curso/entities/curso.entity';
import { DocenteAulaController } from './docente-aula.controller';
import { DocenteAulaService } from './docente-aula.service';
import { Materia } from '../materia/entities/materia.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DocenteAula, User, Aula, Curso, Materia]),
    ],
    controllers: [DocenteAulaController],
    providers: [DocenteAulaService],
})
export class DocenteAulaModule { }
