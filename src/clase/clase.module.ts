import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { User } from '../auth/entities/user.entity';
import { Aula } from '../aula/entities/aula.entity';
import { Curso } from '../curso/entities/curso.entity';
import { ClaseController } from './clase.controller';
import { ClaseService } from './clase.service';
import { Materia } from '../materia/entities/materia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Clase, User, Aula, Curso, Materia]),
        AuthModule
    ],
    controllers: [ClaseController],
    providers: [ClaseService],
})
export class ClaseModule { }
