import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { GestosEnum } from '../gestos.enum';
import { DeepPartial } from 'typeorm';
import { IsBoolean, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreatePruebaDto {
  @IsNotEmpty()
  cumple: string;

  //@IsEnum(GestosEnum)
  @IsNotEmpty()
  gesto: string;

  @IsNotEmpty()
  usuario: DeepPartial<Usuario>;
}
