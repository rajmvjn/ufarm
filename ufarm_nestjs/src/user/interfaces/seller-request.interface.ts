export interface ISellerRequest {
  id?: string;
  status: string;
  description: string;
  req_user_id: string;
  date_created?: any;
  date_updated?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: () => {};
}
