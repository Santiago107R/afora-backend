import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports: [
    TypeOrmModule.forFeature([Curso,]),
    AuthModule,
  ],
  exports: [
    CursoService,
  ]
})
export class CursoModule { }
