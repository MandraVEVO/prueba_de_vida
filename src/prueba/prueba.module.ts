import { Module } from '@nestjs/common';
import { PruebaService } from './prueba.service';
import { PruebaController } from './prueba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prueba, Usuario])],
  controllers: [PruebaController],
  providers: [PruebaService, MinioService],
})
export class PruebaModule {}
