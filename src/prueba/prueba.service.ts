import { Injectable } from '@nestjs/common';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { Express } from 'express';

@Injectable()
export class PruebaService {
  constructor(
    @InjectRepository(Prueba)
    private readonly pruebaRepository: Repository<Prueba>,
    private readonly minioService: MinioService,
  ) {}

  create(createPruebaDto: CreatePruebaDto) {
    return this.pruebaRepository.save(createPruebaDto);
  }

  async createWithImage(
    createPruebaDto: CreatePruebaDto,
    file: Express.Multer.File,
  ) {
    let imageUrl = '';
    if (file) {
      imageUrl = await this.minioService.upload(file);
    }
    const prueba = this.pruebaRepository.create({
      ...createPruebaDto,
      imagen: imageUrl,
    });
    return this.pruebaRepository.save(prueba);
  }

  async createWithBase64(
    createPruebaDto: CreatePruebaDto & {
      imagenBase64: string;
      nombreImagen: string;
      mimetype: string;
    },
  ) {
    let imageUrl = '';
    if (
      createPruebaDto.imagenBase64 &&
      createPruebaDto.nombreImagen &&
      createPruebaDto.mimetype
    ) {
      imageUrl = await this.minioService.uploadBase64(
        createPruebaDto.imagenBase64,
        `${Date.now()}-${createPruebaDto.nombreImagen}`,
        createPruebaDto.mimetype,
      );
    }
    const prueba = this.pruebaRepository.create({
      ...createPruebaDto,
      imagen: imageUrl,
    });
    return this.pruebaRepository.save(prueba);
  }

  findAll() {
    return this.pruebaRepository.find({
      relations: {
        usuario: true,
      },
    });
  }

  findOne(id: number) {
    return this.pruebaRepository.findOne({
      where: {
        id,
      },
      relations: {
        usuario: true,
      },
    });
  }

  update(id: number, updatePruebaDto: UpdatePruebaDto) {
    return this.pruebaRepository.update(id, updatePruebaDto);
  }

  remove(id: number) {
    return this.pruebaRepository.delete(id);
  }
}
