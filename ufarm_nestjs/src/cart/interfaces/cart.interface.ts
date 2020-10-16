export interface ICart {
  id?: string;
  item_id: string;
  quantity: number;
  sell_user_id: string;
  buy_user_id: string;
  status: string;
  date_created?: any;
  date_updated?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: () => {};
}

export interface ICartItems {
  _id: string;
  item_id: string;
  cart_quantity: number;
  sell_user_id: string;
  buy_user_id: string;
  status: string;
  item_name: string;
  item_description: string;
  category_id: string;
  farm_id: string;
  quantity_available: number;
  offer_price_percentage: number;
  image_url: string;
  item_status: boolean;
  unit: string;
}
