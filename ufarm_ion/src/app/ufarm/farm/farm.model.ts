export class FarmItem {
  constructor(
    public name: string,
    public scientific_name: string,
    public description: string,
    public how_to_farm: string,
    public image_url: string,
    public nutrition_fact_image_url: string,
    public status: boolean,
    public base_price: number,
    public allowed_price_diff: number,
    public unit: string,
    public cat_id: string,
    public product_image?: File,
    public _id?: string,
    public date?: Date
  ) {}
}
