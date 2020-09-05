export class Profile {
  constructor(
    public name: string,
    public phone: string,
    public avatar: string | File,
    public email: string,
    public address: string,
    public pincode: string,
    public status: boolean,
    public sell?: boolean,
    public _id?: string,
    public profile_image?: string | File
  ) {}
}
