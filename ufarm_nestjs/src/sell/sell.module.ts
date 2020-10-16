import { Module } from '@nestjs/common';

import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [SellController],
  providers: [SellService, FirestoreService],
  exports: [SellService],
})
export class SellModule {}
