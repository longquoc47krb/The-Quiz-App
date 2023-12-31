
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
import databaseConfig from './configs/database.config';
import { SharedModule } from './modules/shared/shared.module';
import { UtilsModule } from './utils/utils.module';
import { JwtTokenMiddleware, LoggerInterceptor, RolesGuard } from './utils';
import { loggerConf } from './logger';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { TokenModule } from './modules/token/token.module';
import { ResultModule } from './modules/result/result.module';
import { StatsModule } from './modules/stats/stats.module';
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
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
      }),

    }),
    MailerModule.forRoot({
      transport: {
        host: `${process.env.MAIL_HOST}`, // Replace with your SMTP server address
        port: 587, // Replace with the desired port (e.g., 465 for secure SSL)
        secure: false, // Set to true if you are using SSL/TLS
        auth: {
          user: `${process.env.MAIL_USER}`, // Replace with your SMTP username
          pass: `${process.env.MAIL_PASSWORD}`, // Replace with your SMTP password
        },
      },
      defaults: {
        from: `${process.env.MAIL_USER}`, // Replace with the default sender email address
      },
      template: {
        dir: join(__dirname, '..', 'assets/templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AccessControlModule.forRoles(roles),
    SharedModule,
    AuthModule,
    QuizModule,
    QuestionModule,
    UtilsModule,
    TokenModule,
    ResultModule,
    StatsModule,
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
