import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  user_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: number;
  avatar: string;
  status: boolean;
  date_created: Date;
  sell: boolean;
  admin: boolean;
}
