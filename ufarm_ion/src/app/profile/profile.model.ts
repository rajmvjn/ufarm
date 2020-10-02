export class Profile {
  constructor(
    public name: string,
    public phone: string,
    public avatar: string | File,
    public email: string,
    public address: string | object,
    public pincode: string,
    public status: boolean,
    public housename: string,
    public sell?: boolean,
    public _id?: string,
    public profile_image?: string | File,
    public admin?: boolean
  ) {}
}
