export interface Cart {
  item_id: string;
  quantity: number;
  sell_user_id: string;
  buy_user_id: string;
  status: string;
  created_on?: Date;
  updated_on?: Date;
  _id?: string;
}
