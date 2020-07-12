import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class SellerRequest extends Document {
  @Prop()
  rq_id: string;

  @Prop()
  status: string;

  @Prop()
  description: string;

  @Prop()
  req_user_id: string;
}

export const SellerRequestSchema = SchemaFactory.createForClass(SellerRequest);
