import * as mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  cat_id: string;
  name: string;
  img_url: string;
  status: boolean;
}
