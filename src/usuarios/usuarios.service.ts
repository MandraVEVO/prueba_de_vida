import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuariosRepository.create(createUsuarioDto);
      this.usuariosRepository.save(usuario);

      return usuario;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    const usuario = this.usuariosRepository.find();
    return usuario;
  }

  findOne(id: string) {
    return this.usuariosRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosRepository.update(id, updateUsuarioDto);
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new BadRequestException(`Usuario with ID ${id} not found`);
    }
    await this.usuariosRepository.remove(usuario);
    return usuario;
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
