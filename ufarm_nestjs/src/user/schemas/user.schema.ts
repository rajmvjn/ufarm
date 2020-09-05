import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  user_id: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  pincode: number;

  @Prop()
  avatar: string;

  @Prop()
  status: boolean;

  @Prop()
  date_created: Date;

  @Prop()
  sell?: boolean;

  @Prop()
  admin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
