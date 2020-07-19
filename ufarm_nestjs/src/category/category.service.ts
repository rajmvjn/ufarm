import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ICategory } from './interfaces/category.interface';
import { CategoryDto } from './dto/category-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
  ) {}

  /**
   * Function to return the list of category
   */
  public async getAllCategory(): Promise<ICategory[]> {
    Logger.log('Inside get all category service');
    return await this.categoryModel.find().exec();
  }

  /**
   * Function to create category
   * @param categoryReq: CategoryDto
   */
  public async createCategory(categoryReq: CategoryDto): Promise<ICategory> {
    Logger.log('Inside create category service', JSON.stringify(categoryReq));
    const category = await this.categoryModel(categoryReq);
    return category.save();
  }

  /**
   * Function to update category based on the categoryId
   * @param categoryReq: CategoryDto
   * @param categoryId: string
   */
  public async updateCategory(
    categoryReq: CategoryDto,
    categoryId: string,
  ): Promise<ICategory> {
    Logger.log(
      `Inside get update category service: ${categoryId}`,
      JSON.stringify(categoryReq),
    );
    return await this.categoryModel.findByIdAndUpdate(categoryId, categoryReq, {
      new: true,
    });
  }

  /**
   * Function to get category based on the provided category Id
   * @param categoryId: string
   */
  public async getCategory(categoryId: string): Promise<ICategory[]> {
    Logger.log(`Inside get category by id service: ${categoryId}`);
    return await this.categoryModel.findById(categoryId).exec();
  }

  /**
   * Function to delete category based on the provided category Id
   * @param categoryId: string
   */
  public async deleteCategory(categoryId: string): Promise<string> {
    Logger.log(`Inside delete category by id service: ${categoryId}`);
    return await this.categoryModel.findByIdAndRemove(categoryId).exec();
  }
}
