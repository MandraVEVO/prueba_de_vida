import { Prueba } from 'src/prueba/entities/prueba.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
  @Column()
  apellidopa: string;
  @Column()
  apellidoma: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Prueba, (prueba) => prueba.usuario)
  pruebas: Prueba[];
}
