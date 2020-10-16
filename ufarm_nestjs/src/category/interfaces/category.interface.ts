export interface ICategory {
  id?: string;
  name: string;
  image_url: string;
  status: string;
  description: string;
  date_created?: any;
  date_updated?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: () => {};
}
