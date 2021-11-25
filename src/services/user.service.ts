import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/schemas/user.schema';
import { CreateUserDTO } from '../models/DTO/user.dto';
import { LoginFormModel } from '../models/login-form.model';
import { RegistrazioneFormModel } from '../models/registrazione-form.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(userDto: CreateUserDTO): Promise<void> {
    const newUser = await new this.userModel(userDto);
    newUser.save();
  }

  public async findByEmailAndPassword({
    email,
    password,
  }: LoginFormModel): Promise<RegistrazioneFormModel> {
    const user = await this.userModel
      .findOne({ email: email, password: password })
      .exec();
    if (!user) {
      throw new NotFoundException(`Utente inesistente`);
    }
    return user;
  }
}
