import { Module } from '@nestjs/common';

import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [FarmController],
  providers: [FarmService, FirestoreService],
})
export class FarmModule {}
