import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [CartController],
  providers: [CartService, FirestoreService],
  exports: [CartService],
})
export class CartModule {}
