
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import { AccessControlModule } from 'nest-access-control';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET, TYPEORM_CONFIG } from './configs/constants';
import { roles } from './app.roles';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionModule } from './modules/question/question.module';
import { QuizSessionModule } from './modules/quiz-session/quiz-session.module';
import databaseConfig from './configs/database.config';
import { SharedModule } from './modules/shared/shared.module';
import { UtilsModule } from './utils/utils.module';
import { JwtTokenMiddleware, LoggerInterceptor, RolesGuard } from './utils';
import { loggerConf } from './logger';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

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
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '24h' },
    }),
    AccessControlModule.forRoles(roles),
    SharedModule,
    AuthModule,
    QuizModule,
    QuestionModule,
    QuizSessionModule,
    UtilsModule,
    WinstonModule.forRoot(loggerConf),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  }, {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

  }
}
