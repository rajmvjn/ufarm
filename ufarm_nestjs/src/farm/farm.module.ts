import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { FarmSchema } from './schemas/farm.schema';
import { FarmSupportSchema } from './schemas/farm-support.schema';

@Module({
  controllers: [FarmController],
  providers: [FarmService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Farm', schema: FarmSchema },
      { name: 'FarmSupport', schema: FarmSupportSchema },
    ]),
  ],
})
export class FarmModule {}
