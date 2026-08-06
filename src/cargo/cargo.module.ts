import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CargoController],
  providers: [CargoService],
  imports: [
    TypeOrmModule.forFeature([Cargo]),
    AuthModule
  ],
})
export class CargoModule { }
