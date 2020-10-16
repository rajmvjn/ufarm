import { Injectable, Logger } from '@nestjs/common';

import { ISell } from './interfaces/sell.interface';
import { SellDto } from './dto/sell-dto';
import { FirestoreService } from '../firestore/firestore.service';
import * as admin from 'firebase-admin';

@Injectable()
export class SellService {
  private sellItemCollection: any;
  constructor(private readonly firestoreService: FirestoreService) {
    this.sellItemCollection = admin.firestore().collection('sell_item');
  }

  /**
   * Function to return the list of items
   */
  public async getAllItems(): Promise<ISell[]> {
    Logger.log('Inside get all items service');
    return await this.sellItemCollection.get();
  }

  /**
   * Function to create item based on provided data
   * @param sellReq: SellDto
   */
  public async createItem(sellReq: SellDto): Promise<ISell> {
    sellReq.date_created = this.firestoreService.timestamp();
    Logger.log('Inside create item service', JSON.stringify(sellReq));
    return await this.sellItemCollection.add(Object.assign({}, sellReq));
  }

  /**
   * Function to update item based on the itemId
   * @param sellReq: SellDto
   * @param itemId: string
   */
  public async updateItem(sellReq: SellDto, itemId: string): Promise<ISell> {
    Logger.log(
      `Inside get update item service: ${itemId}`,
      JSON.stringify(sellReq),
    );
    return await this.sellItemCollection
      .doc(itemId)
      .update(Object.assign({}, sellReq));
  }

  /**
   * Function to get item based on the provided item Id
   * @param itemId: string
   */
  public async getItem(itemId: string): Promise<ISell> {
    Logger.log(`Inside get itemId service: ${itemId}`);
    return await this.sellItemCollection.doc(itemId).get();
  }

  /**
   * Function to delete item based on the provided item Id
   * @param itemId: string
   */
  public async deleteItem(itemId: string): Promise<string> {
    Logger.log(`Inside delete sell by id service: ${itemId}`);
    return await this.sellItemCollection.doc(itemId).delete();
  }

  /**
   * Function to return the list of seller items
   */
  public async getSellerItems(sellerId: string): Promise<any> {
    Logger.log('Inside get Seller items service', sellerId);
    return await this.sellItemCollection
      .where('sell_user_id', '==', sellerId)
      .get();
  }

  /**
   * Function to return the list of buyer items
   */
  public async getBuyerItems(sellerId: string): Promise<any> {
    Logger.log('Inside get Buyer items service', sellerId);
    return await this.sellItemCollection
      .where('sell_user_id', '!=', sellerId)
      .get();
  }
}
