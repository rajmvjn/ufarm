import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import configuration from './config/configuration';
import { CategoryModule } from './category/category.module';
import { FarmModule } from './farm/farm.module';

import { UserModule } from './user/user.module';
import { SellModule } from './sell/sell.module';
import { CartModule } from './cart/cart.module';
import config from './config/configuration';

@Module({
  imports: [
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
})
export class AppModule {}
