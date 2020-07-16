import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  cat_id: string;

  @Prop()
  name: string;

  @Prop()
  status: boolean;

  @Prop()
  img_url: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
