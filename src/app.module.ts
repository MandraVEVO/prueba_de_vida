import { Module } from '@nestjs/common';

import { PruebaModule } from './prueba/prueba.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: +process.env.DB_PORT! || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true, //no se usa en produccion
   }),
    
    PruebaModule,
     UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
