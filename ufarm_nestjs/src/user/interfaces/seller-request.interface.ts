import * as mongoose from 'mongoose';

export interface ISellerRequest extends mongoose.Document {
  rq_id: string;
  status: string;
  description: string;
  req_user_id: string;
}
