import { Injectable, Logger } from '@nestjs/common';

import { ICategory } from './interfaces/category.interface';
import { CategoryDto } from './dto/category-dto';
import { FirestoreService } from '../firestore/firestore.service';
import * as admin from 'firebase-admin';

@Injectable()
export class CategoryService {
  private categoryCollection: any;
  constructor(private readonly firestoreService: FirestoreService) {
    this.categoryCollection = admin.firestore().collection('category');
  }

  /**
   * Function to return the list of category
   */
  public async getAllCategory(): Promise<ICategory[]> {
    Logger.log('Inside get all category service');
    return await this.categoryCollection.get();
  }

  /**
   * Function to create category
   * @param categoryReq: CategoryDto
   */
  public async createCategory(categoryReq: CategoryDto): Promise<ICategory> {
    Logger.log('Inside create category service', JSON.stringify(categoryReq));
    return await this.categoryCollection.add(Object.assign({}, categoryReq));
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
    return await this.categoryCollection
      .doc(categoryId)
      .update(Object.assign({}, categoryReq));
  }

  /**
   * Function to get category based on the provided category Id
   * @param categoryId: string
   */
  public async getCategory(categoryId: string): Promise<ICategory> {
    Logger.log(`Inside get category by id service: ${categoryId}`);
    return await this.categoryCollection.doc(categoryId).get();
  }

  /**
   * Function to delete category based on the provided category Id
   * @param categoryId: string
   */
  public async deleteCategory(categoryId: string): Promise<string> {
    Logger.log(`Inside delete category by id service: ${categoryId}`);
    return await this.categoryCollection.doc(categoryId).delete();
  }
}
