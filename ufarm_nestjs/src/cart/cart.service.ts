import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ICart } from './interfaces/cart.interface';
import { CartDto } from './dto/cart-dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<ICart>) {}

  /**
   * Function to return the list of cart
   */
  public async getAllCart(): Promise<ICart[]> {
    Logger.log('Inside get all cart service');
    return await this.cartModel.find().exec();
  }

  /**
   * Function to create cart
   * @param cartReq: CartDto
   */
  public async createCart(cartReq: CartDto): Promise<ICart> {
    Logger.log('Inside create cart service', JSON.stringify(cartReq));
    const cart = await this.cartModel(cartReq);
    return cart.save();
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
    return await this.cartModel.findByIdAndUpdate(cartId, cartReq, {
      new: true,
    });
  }

  /**
   * Function to get cart based on the provided cart Id
   * @param cartId: string
   */
  public async getCart(cartId: string): Promise<ICart> {
    Logger.log(`Inside get cart by id service: ${cartId}`);
    return await this.cartModel.findById(cartId).exec();
  }

  /**
   * Function to delete cart based on the provided cart Id
   * @param cartId: string
   */
  public async deleteCart(cartId: string): Promise<string> {
    Logger.log(`Inside delete cart by id service: ${cartId}`);
    return await this.cartModel.findByIdAndRemove(cartId).exec();
  }
}
