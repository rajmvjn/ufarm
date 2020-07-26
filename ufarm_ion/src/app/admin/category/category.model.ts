export class Category {
  constructor(
    public cat_id: string,
    public name: string,
    public description: string,
    public img_url: string,
    public status: boolean,
    public _id?: string
  ) {}
}
