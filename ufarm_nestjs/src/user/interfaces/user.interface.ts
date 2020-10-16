export interface IUser {
  name: string;
  phone: string;
  email: string;
  address: string;
  housename: string;
  password: string;
  pincode: number;
  avatar: string;
  status: boolean;
  date_created?: string;
  date_updated?: string;
  sell?: boolean;
  admin?: boolean;
  role?: string;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: () => {};
}
