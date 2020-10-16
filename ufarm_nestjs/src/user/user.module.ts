import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FirestoreService],
  exports: [UserService],
})
export class UserModule {}
