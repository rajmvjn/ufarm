import { Injectable, Logger } from '@nestjs/common';

import { ICart } from './interfaces/cart.interface';
import { CartDto } from './dto/cart-dto';
import { FirestoreService } from '../firestore/firestore.service';
import * as admin from 'firebase-admin';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class CartService {
  private cartCollection: any;
  private sellItemCollection: any;
  constructor(private readonly firestoreService: FirestoreService) {
    this.cartCollection = admin.firestore().collection('cart');
    this.sellItemCollection = admin.firestore().collection('sell_item');
  }

  /**
   * Function to return the list of cart
   */
  public async getAllCart(): Promise<ICart[]> {
    Logger.log('Inside get all cart service');
    return await this.cartCollection.get();
  }

  /**
   * Function to create cart
   * @param cartReq: CartDto
   */
  public async createCart(cartReq: CartDto): Promise<ICart> {
    Logger.log('Inside create cart service', JSON.stringify(cartReq));
    cartReq.date_created = this.firestoreService.timestamp();
    return await this.cartCollection.add(Object.assign({}, cartReq));
  }

  /**
   * Function to update cart based on the cartId
   * @param cartReq: CartDto
   * @param cartId: string
   */
  public async updateCart(cartReq: CartDto, cartId: string): Promise<ICart> {
    Logger.log(
      `Inside get update cart service: ${cartId}`,
      JSON.stringify(cartReq),
    );
    return await this.cartCollection
      .doc(cartId)
      .update(Object.assign({}, cartReq));
  }

  /**
   * Function to get cart based on the provided cart Id
   * @param cartId: string
   */
  public async getCart(cartId: string): Promise<ICart> {
    Logger.log(`Inside get cart by id service: ${cartId}`);
    return await this.cartCollection.doc(cartId).get();
  }

  /**
   * Function to get cart based on cart item status
   * @param status: string
   */
  public async getCartByStatus(status: string): Promise<ICart> {
    Logger.log(`Inside get cart by status service: ${status}`);
    return await this.cartCollection.where('status', '==', status).get();
  }

  /**
   * Function to delete cart based on the provided cart Id
   * @param cartId: string
   */
  public async deleteCart(cartId: string): Promise<string> {
    Logger.log(`Inside delete cart by id service: ${cartId}`);
    return await this.cartCollection.doc(cartId).delete();
  }

  /**
   * Function to get cart item based on buyer id
   * @param buyerId: string
   */
  public async getBuyerCartItems(buyerId: string): Promise<ICart> {
    Logger.log(`Inside getBuyerCartItems service: ${buyerId}`);
    return await this.cartCollection.where('buy_user_id', '==', buyerId).get();
  }

  /**
   * Function to get product detail based on the item id
   * @param itemIds: string[]
   */
  public getProductDetails(itemIds: string[]): Observable<any> {
    Logger.log(`Inside getProductDetails service: ${JSON.stringify(itemIds)}`);
    const sellItems = itemIds.map(itemId =>
      this.sellItemCollection.doc(itemId).get(),
    );
    return forkJoin(sellItems);
  }
}
