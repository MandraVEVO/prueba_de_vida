import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('login')
export class LoginController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async login(@Body() body: { email: string; password: string }) {
    const usuario = await this.usuariosService.findByEmail(body.email);
    if (usuario && usuario.password === body.password) {
      return true;
    }
    return false;
  }
}
