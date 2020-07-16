import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Farm extends Document {
  @Prop()
  farm_id: string;

  @Prop()
  name: string;

  @Prop()
  scientific_name: string;

  @Prop()
  cat_id: string;

  @Prop()
  description: string;

  @Prop()
  how_to_farm: string;

  @Prop()
  status: boolean;

  @Prop()
  image_url: string;

  @Prop()
  date: Date;

  @Prop()
  nutrition_fact_image_url: string;

  @Prop()
  base_price: number;

  @Prop()
  unit: string;

  @Prop()
  allowed_price_diff: number;
}

export const FarmSchema = SchemaFactory.createForClass(Farm);
