import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop()
  cart_id: string;

  @Prop()
  quantity: number;

  @Prop()
  sell_user_id: string;

  @Prop()
  buy_user_id: string;

  @Prop()
  status: string;

  @Prop()
  created_on: Date;

  @Prop()
  updated_on: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
