export class Category {
  constructor(
    public name: string,
    public description: string,
    public image_url: string,
    public status: boolean,
    public _id?: string
  ) {}
}
