import { Module } from '@nestjs/common';

import { PruebaModule } from './prueba/prueba.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    
    PruebaModule,
     UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
