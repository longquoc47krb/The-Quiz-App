/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import { AccessControlModule } from 'nest-access-control';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TYPEORM_CONFIG } from './configs/constants';
import { roles } from './app.roles';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { QuizSessionModule } from './quiz-session/quiz-session.module';
import databaseConfig from './configs/database.config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
      }),

    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    QuizModule,
    QuestionModule,
    QuizSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
