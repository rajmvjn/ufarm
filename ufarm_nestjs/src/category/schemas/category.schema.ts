import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  cat_id: string;

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  img_url: string;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
