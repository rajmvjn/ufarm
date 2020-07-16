import * as mongoose from 'mongoose';

export interface IFarm extends mongoose.Document {
  farm_id: string;
  name: string;
  scientific_name: string;
  cat_id: string;
  description: string;
  how_to_farm: string;
  status: boolean;
  image_url: string;
  date: Date;
  nutrition_fact_image_url: string;
  base_price: number;
  unit: string;
  allowed_price_diff: number;
}
