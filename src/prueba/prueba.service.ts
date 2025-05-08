import { Injectable } from '@nestjs/common';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PruebaService {
  constructor(
    @InjectRepository(Prueba)
    private readonly pruebaRepository: Repository<Prueba>,
  ) {}

  create(createPruebaDto: CreatePruebaDto) {
    return this.pruebaRepository.save(createPruebaDto);
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
