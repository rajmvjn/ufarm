import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
//import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
// import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { options } from './config/swagger.config';
import config from './config/configuration';
import { AllExceptionsFilter } from './shared/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Use helmet middleware to set appropriate security related HTTP headers to avoid well known web vulnerabilities
  app.use(helmet());

  // Avoid cross site scripting issue
  // app.use(cookieParser());
  // app.use(csurf({ cookie: true }));

  // A common technique to protect applications from brute-force attack
  app.use(
    rateLimit({
      windowMs: config().rate_limit.minutes * 60 * 1000, // 10 minutes
      max: config().rate_limit.max, // limit each IP to no of requests per windowMs from configuration file
    }),
  );

  // Set the config options

  //set api prefix
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Intialize swagger module
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (config().enable_cors) {
    app.enableCors();
  }

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(config().PORT || 3010);
}
bootstrap();
