import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  nome: string;
  @Prop()
  cognome: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
