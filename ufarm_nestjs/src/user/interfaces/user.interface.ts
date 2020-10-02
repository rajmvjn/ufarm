import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  housename: string;
  password: string;
  pincode: number;
  avatar: string;
  status: boolean;
  date_created: Date;
  sell?: boolean;
  admin?: boolean;
}
