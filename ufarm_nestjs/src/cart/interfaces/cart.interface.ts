import * as mongoose from 'mongoose';

export interface ICart extends mongoose.Document {
  cart_id: string;
  item_id: string;
  quantity: number;
  sell_user_id: string;
  buy_user_id: string;
  status: string;
  date_created: Date;
}
