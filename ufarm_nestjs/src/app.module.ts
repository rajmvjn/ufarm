import { Module } from '@nestjs/common';
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
import { AppService } from './app.service';

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
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    CartModule,
  ],
  providers: [FirestoreService, AppService],
})
export class AppModule {}
