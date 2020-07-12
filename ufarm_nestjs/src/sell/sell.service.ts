import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ISell } from './interfaces/sell.interface';
import { SellDto } from './dto/sell-dto';

@Injectable()
export class SellService {
  constructor(@InjectModel('Sell') private readonly sellModel: Model<ISell>) {}

  /**
   * Function to return the list of items
   */
  public async getAllItems(): Promise<ISell[]> {
    Logger.log('Inside get all items service');
    return await this.sellModel.find().exec();
  }

  /**
   * Function to create item based on provided data
   * @param sellReq: SellDto
   */
  public async createItem(sellReq: SellDto): Promise<ISell> {
    Logger.log('Inside create item service', JSON.stringify(sellReq));
    const sell = await this.sellModel(sellReq);
    return sell.save();
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
    return await this.sellModel.findByIdAndUpdate(itemId, sellReq, {
      new: true,
    });
  }

  /**
   * Function to get item based on the provided item Id
   * @param itemId: string
   */
  public async getItem(itemId: string): Promise<ISell> {
    Logger.log(`Inside get itemId service: ${itemId}`);
    return await this.sellModel.findById(itemId).exec();
  }

  /**
   * Function to delete item based on the provided item Id
   * @param itemId: string
   */
  public async deleteItem(itemId: string): Promise<string> {
    Logger.log(`Inside delete sell by id service: ${itemId}`);
    return await this.sellModel.findByIdAndRemove(itemId).exec();
  }
}
