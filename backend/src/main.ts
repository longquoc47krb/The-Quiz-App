import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './configs/constants';
import generateTypeormConfigFile from './scripts/generateTypeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 8080;

  initSwagger(app);
  generateTypeormConfigFile(config);
  app.enableCors({
    origin: '*', // Replace with your frontend URL
  });
  // Configure CORS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(logger);
  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
