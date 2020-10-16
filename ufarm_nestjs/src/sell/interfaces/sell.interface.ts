export interface ISell {
  name: string;
  category_id: string;
  farm_id: string;
  description: string;
  quantity_available: number;
  unit: string;
  sell_user_id: string;
  status: boolean;
  offer_price_percentage: number;
  image_url: string;
  date_created: any;
  date_updated: any;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: () => {};
}
