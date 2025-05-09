import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GestosEnum } from '../gestos.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Prueba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cumple: string;

  @Column()
  gesto: string;

  @Column()
  imagen: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.pruebas)
  usuario: Usuario;
}
