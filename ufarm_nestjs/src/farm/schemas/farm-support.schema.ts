import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class FarmSupport extends Document {
  @Prop()
  farm_suprt_id: string;

  @Prop()
  status: string;

  @Prop()
  image_url: string;

  @Prop()
  description: string;

  @Prop()
  admin_phone: string;

  @Prop()
  name: string;
}

export const FarmSupportSchema = SchemaFactory.createForClass(FarmSupport);
