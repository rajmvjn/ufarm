import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, FirestoreService],
  exports: [CategoryService],
})
export class CategoryModule {}
