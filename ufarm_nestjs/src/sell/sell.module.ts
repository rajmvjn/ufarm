import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { SellSchema } from './schemas/sell.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sell', schema: SellSchema }])],
  controllers: [SellController],
  providers: [SellService],
  exports: [SellService],
})
export class SellModule {}
