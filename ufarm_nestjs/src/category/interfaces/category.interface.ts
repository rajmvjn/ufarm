import * as mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  cat_id: string;
  name: string;
  image_url: string;
  status: string;
  description: string;
}
