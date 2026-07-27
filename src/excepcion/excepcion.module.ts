import { Module } from '@nestjs/common';
import { ExcepcionService } from './excepcion.service';
import { ExcepcionController } from './excepcion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { Excepcion } from './entities/excepcion.entity';
import { User } from 'src/auth/entities/user.entity';
import { Aula } from 'src/aula/entities/aula.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExcepcionController],
  providers: [ExcepcionService],
  imports: [
    TypeOrmModule.forFeature([Excepcion, Clase, User, Aula]),
    AuthModule,
  ],
})
export class ExcepcionModule {}
