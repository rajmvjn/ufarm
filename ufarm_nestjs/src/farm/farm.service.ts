import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IFarm } from './interfaces/farm.interface';
import { IFarmSupport } from './interfaces/farm-support.interface';
import { FarmDto } from './dto/farm.dto';
import { FarmSupportDto } from './dto/farm-support.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectModel('Farm') private readonly farmModel: Model<IFarm>,
    @InjectModel('FarmSupport')
    private readonly farmSupportModel: Model<IFarmSupport>,
  ) {}

  /**
   * Function to return the list of farm request
   */
  public async getAll(): Promise<IFarm[]> {
    Logger.log('Inside get all farm request service');
    return await this.farmModel.find().exec();
  }

  /**
   * Function to create farm request
   * @param farmerReq: FarmDto
   */
  public async createFarmProduct(farmerReq: FarmDto): Promise<IFarm> {
    Logger.log('Inside create Farm Product service', JSON.stringify(farmerReq));
    const farmProduct = await this.farmModel(farmerReq);
    return farmProduct.save();
  }

  /**
   * Function to update farm request based on the farmId
   * @param farmReq: FarmDto
   * @param farmId: string
   */
  public async updateFarmProduct(
    farmReq: FarmDto,
    farmId: string,
  ): Promise<IFarm> {
    Logger.log(
      `Inside get update Farm request service: ${farmId}`,
      JSON.stringify(farmReq),
    );
    return await this.farmModel.findByIdAndUpdate(farmId, farmReq, {
      new: true,
    });
  }

  /**
   * Function to get farm request based on the provided farm Id
   * @param farmId: string
   */
  public async getFarmProductById(farmId: string): Promise<IFarm> {
    Logger.log(`Inside get farm request by id service: ${farmId}`);
    return await this.farmModel.findById(farmId).exec();
  }

  /**
   * Function to delete farm request bssed on the provided farm Id
   * @param farmId: string
   */
  public async deleteFarmProduct(farmId: string): Promise<string> {
    Logger.log(`Inside delete farm request by id service: ${farmId}`);
    return await this.farmModel.findByIdAndRemove(farmId).exec();
  }

  /**
   * Function to return the list of farm support
   */
  public async getAllFarmSupport(): Promise<IFarmSupport[]> {
    Logger.log('Inside get all farm support service');
    return await this.farmSupportModel.find().exec();
  }

  /**
   * Function to create farm support
   * @param farmerSupportReq: FarmSupportDto
   */
  public async createFarmSupport(
    farmerSupportReq: FarmSupportDto,
  ): Promise<IFarmSupport> {
    Logger.log(
      'Inside create Farm support service',
      JSON.stringify(farmerSupportReq),
    );
    const farmSupport = await this.farmSupportModel(farmerSupportReq);
    return farmSupport.save();
  }

  /**
   * Function to update farmSupport based on the farmId
   * @param farmSupportReq: FarmSupportDto
   * @param farmSupportId: string
   */
  public async updateFarmSupport(
    farmSupportReq: FarmSupportDto,
    farmSupportId: string,
  ): Promise<IFarmSupport> {
    Logger.log(
      `Inside get update Farm support service: ${farmSupportId}`,
      JSON.stringify(farmSupportReq),
    );
    return await this.farmSupportModel.findByIdAndUpdate(
      farmSupportId,
      farmSupportReq,
      {
        new: true,
      },
    );
  }

  /**
   * Function to get farmSupport based on the provided  Id
   * @param farmSupportReq: string
   */
  public async getFarmSupportById(
    farmSupportReq: string,
  ): Promise<IFarmSupport> {
    Logger.log(`Inside get farm request by id service: ${farmSupportReq}`);
    return await this.farmSupportModel.findById(farmSupportReq).exec();
  }

  /**
   * Function to delete farm support bssed on the provided  Id
   * @param farmSupportId: string
   */
  public async deleteFarmSupport(farmSupportId: string): Promise<string> {
    Logger.log(`Inside delete farm support by id service: ${farmSupportId}`);
    return await this.farmSupportModel.findByIdAndRemove(farmSupportId).exec();
  }
}
