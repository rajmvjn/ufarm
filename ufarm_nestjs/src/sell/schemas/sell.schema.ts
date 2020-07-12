import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Sell extends Document {
  @Prop()
  item_id: string;

  @Prop()
  name: string;

  @Prop()
  category_id: string;

  @Prop()
  farm_id: string;

  @Prop()
  description: string;

  @Prop()
  quantity_available: number;

  @Prop()
  price: number;

  @Prop()
  unit: string;

  @Prop()
  unit_value: number;

  @Prop()
  sell_user_id: string;

  @Prop()
  status: boolean;

  @Prop()
  offer_price: number;

  @Prop()
  image_url: string;

  @Prop()
  date_created: Date;
}

export const SellSchema = SchemaFactory.createForClass(Sell);
