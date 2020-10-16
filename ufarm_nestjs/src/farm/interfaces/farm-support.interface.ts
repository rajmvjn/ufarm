export interface IFarmSupport {
  farm_suprt_id: string;
  status: string;
  image_url: string;
  description: string;
  admin_phone: string;
  name: string;
  id?: string;
  date_created?: any;
  date_updated?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: () => {};
}
