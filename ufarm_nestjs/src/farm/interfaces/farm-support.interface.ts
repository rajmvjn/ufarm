import * as mongoose from 'mongoose';

export interface IFarmSupport extends mongoose.Document {
  farm_suprt_id: string;
  status: string;
  image_url: string;
  description: string;
  admin_phone: string;
  name: string;
}
