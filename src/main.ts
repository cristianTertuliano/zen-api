import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { ContextMiddleware } from '@core/middleware/context-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const config = app.get(ConfigService);
  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

  app.use(cors(options));
  app.use(ContextMiddleware);
  await app.listen(3000);
  console.log('Welcome zen-api ')
  console.log('Created by Cristian Tertuliano')
  console.log('----------------------')
  console.log(`Listining in ${config.get('enviroment')} mod `);
}
bootstrap();
