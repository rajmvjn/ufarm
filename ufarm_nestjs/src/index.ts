import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import { Logger } from '@nestjs/common';

const server = express();

const createNestServer = async expressInstance => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};

createNestServer(server)
  .then(() => Logger.log('Nest Ready'))
  .catch(err => Logger.error('Nest broken', err));

export const api = functions.https.onRequest(server);
