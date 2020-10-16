import { Injectable, Logger } from '@nestjs/common';

import * as admin from 'firebase-admin';

import { IFarm } from './interfaces/farm.interface';
import { IFarmSupport } from './interfaces/farm-support.interface';
import { FarmDto } from './dto/farm.dto';
import { FarmSupportDto } from './dto/farm-support.dto';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class FarmService {
  private farmCollection: any;
  private farmSupportCollection: any;
  constructor(private readonly firestoreService: FirestoreService) {
    this.farmSupportCollection = admin.firestore().collection('farm_support');
    this.farmCollection = admin.firestore().collection('farm_product');
  }

  /**
   * Function to return the list of farm request
   */
  public async getAll(): Promise<IFarm[]> {
    Logger.log('Inside get all farm request service');
    return await this.farmCollection.get();
  }

  /**
   * Function to create farm request
   * @param farmerReq: FarmDto
   */
  public async createFarmProduct(farmerReq: FarmDto): Promise<IFarm> {
    farmerReq.date_created = this.firestoreService.timestamp();
    Logger.log('Inside create Farm Product service', JSON.stringify(farmerReq));
    return await this.farmCollection.add(Object.assign({}, farmerReq));
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
    return await this.farmCollection
      .doc(farmId)
      .update(Object.assign({}, farmReq));
  }

  /**
   * Function to get farm request based on the provided farm Id
   * @param farmId: string
   */
  public async getFarmProductById(farmId: string): Promise<IFarm> {
    Logger.log(`Inside get farm request by id service: ${farmId}`);
    return await this.farmCollection.doc(farmId).get();
  }

  /**
   * Function to delete farm request bssed on the provided farm Id
   * @param farmId: string
   */
  public async deleteFarmProduct(farmId: string): Promise<string> {
    Logger.log(`Inside delete farm request by id service: ${farmId}`);
    return await this.farmCollection.doc(farmId).delete();
  }

  /**
   * Function to return the list of farm support
   */
  public async getAllFarmSupport(): Promise<IFarmSupport[]> {
    Logger.log('Inside get all farm support service');
    return await this.farmSupportCollection.get();
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
    farmerSupportReq.date_created = this.firestoreService.timestamp();
    return await this.farmSupportCollection.add(
      Object.assign({}, farmerSupportReq),
    );
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
    return await this.farmSupportCollection
      .doc(farmSupportId)
      .update(Object.assign({}, farmSupportReq));
  }

  /**
   * Function to get farmSupport based on the provided  Id
   * @param farmSupportReq: string
   */
  public async getFarmSupportById(
    farmSupportReq: string,
  ): Promise<IFarmSupport> {
    Logger.log(`Inside get farm request by id service: ${farmSupportReq}`);
    return await this.farmSupportCollection.doc(farmSupportReq).get();
  }

  /**
   * Function to delete farm support bssed on the provided  Id
   * @param farmSupportId: string
   */
  public async deleteFarmSupport(farmSupportId: string): Promise<string> {
    Logger.log(`Inside delete farm support by id service: ${farmSupportId}`);
    return await this.farmSupportCollection.doc(farmSupportId).delete();
  }
}
