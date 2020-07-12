import * as mongoose from 'mongoose';

export interface ISell extends mongoose.Document {
  item_id: string;
  name: string;
  category_id: string;
  farm_id: string;
  description: string;
  quantity_available: number;
  price: number;
  unit: string;
  unit_value: number;
  sell_user_id: string;
  status: boolean;
  offer_price: number;
  image_url: string;
  date_created: Date;
}
