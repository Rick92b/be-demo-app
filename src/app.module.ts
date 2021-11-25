import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Logger } from './services/logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { User, UserSchema } from './models/schemas/user.schema';
import { jwtConstants } from './auth/secret-key';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Db-demo'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes('*');
  }
}
