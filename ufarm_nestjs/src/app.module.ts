import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import * as Joi from '@hapi/joi';

import configuration from './config/configuration';
import { CategoryModule } from './category/category.module';
import { FarmModule } from './farm/farm.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { SellModule } from './sell/sell.module';
import { CartModule } from './cart/cart.module';
import config from './config/configuration';
import { FirestoreService } from './firestore/firestore.service';

@Module({
  controllers: [AppController],
  imports: [
    MulterModule.register({
      dest: './images',
    }),
    CategoryModule,
    FarmModule,
    UserModule,
    SellModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGO_DB_PASSWORD: Joi.string(),
        MONGO_DB_NAME: Joi.string(),
        MONGO_DB_USER_NAME: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    CartModule,
    MongooseModule.forRoot(config().database.MONGO_DB_URI, {
      useNewUrlParser: true,
    }),
  ],
  providers: [FirestoreService],
})
export class AppModule {}
