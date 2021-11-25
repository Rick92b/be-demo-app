import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Headers,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { LoginFormModel } from '../models/login-form.model';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../models/DTO/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('ping')
  getPing(): string {
    return this.appService.getPing();
  }

  @Get('check-token/')
  checkToken(@Res() res, @Headers() header) {
    try {
      this.jwtService.verify(header.authorization);
      return res.status(HttpStatus.OK).json({
        message: 'Accesso confermato',
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Accesso non consentito',
        status: 400,
      });
    }
  }

  @Post('do-login')
  async doLogin(@Res() res, @Body() loginForm: LoginFormModel) {
    try {
      const user = await this.userService.findByEmailAndPassword(loginForm);

      return res.status(HttpStatus.OK).json({
        token: this.jwtService.sign({ nome: user.nome, cognome: user.cognome }),
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Utente non trovato',
        status: 400,
      });
    }
  }

  @Post('insert-user')
  async insertUser(@Res() res, @Body() user: CreateUserDTO) {
    //insert all'interno del db
    try {
      await this.userService.create(user);
      return res.status(HttpStatus.OK).json({
        message: 'Utente Creato ',
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Utente non creato',
        status: 400,
      });
    }
  }
}
