import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';

import { IUser } from './interfaces/user.interface';
import { ISellerRequest } from './interfaces/seller-request.interface';
import { UserDto } from './dto/user-dto';
import { SellerRequestDto } from './dto/seller-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('SellerRequest')
    private readonly sellerRequestModel: Model<ISellerRequest>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Function to return the list of user
   */
  public async getAllUser(): Promise<IUser[]> {
    Logger.log('Inside get all user service');
    return await this.userModel.find().exec();
  }

  /**
   * Function to get user based on the provided user Id
   * @param userId: string
   */
  public async getUserAuthenticated(user: any): Promise<IUser> {
    Logger.log(`Inside get user by id service: ${user.email}`);
    return await this.userModel
      .find({ email: user.email, password: user.password })
      .exec();
  }

  /**
   * Function to create user
   * @param userReq: UserDto
   */
  public async createUser(userReq: UserDto): Promise<IUser> {
    Logger.log('Inside create user service', JSON.stringify(userReq));
    const user = await this.userModel(userReq);
    return user.save();
  }

  /**
   * Function to update user based on the userId
   * @param userReq: UserDto
   * @param userId: string
   */
  public async updateUser(userReq: UserDto, userId: string): Promise<IUser> {
    Logger.log(
      `Inside get update user service: ${userId}`,
      JSON.stringify(userReq),
    );
    return await this.userModel.findByIdAndUpdate(userId, userReq, {
      new: true,
    });
  }

  /**
   * Function to get user based on the provided user Id
   * @param userId: string
   */
  public async getUser(userId: string): Promise<IUser> {
    Logger.log(`Inside get user by id service: ${userId}`);
    return await this.userModel.findById(userId).exec();
  }

  /**
   * Function to delete user based on the provided user Id
   * @param userId: string
   */
  public async deleteUser(userId: string): Promise<string> {
    Logger.log(`Inside delete user by id service: ${userId}`);
    return await this.userModel.findByIdAndRemove(userId).exec();
  }

  /**
   * Function to get seller request based on the provided user Id
   * @param reqId: string
   */
  public async getSellerRequest(reqId: string): Promise<ISellerRequest> {
    Logger.log(`Inside get seller request by id service: ${reqId}`);
    return await this.sellerRequestModel.findById(reqId).exec();
  }

  /**
   * Function to delete seller request based on the provided request Id
   * @param reqId: string
   */
  public async deleteSellerRequest(reqId: string): Promise<string> {
    Logger.log(`Inside delete seller request by id service: ${reqId}`);
    return await this.sellerRequestModel.findByIdAndRemove(reqId).exec();
  }

  /**
   * Function to return the list of Seller requests
   */
  public async getAllRequest(): Promise<ISellerRequest[]> {
    Logger.log('Inside get all seller request service');
    return await this.sellerRequestModel.find().exec();
  }

  /**
   * Function to create user
   * @param sellerReq: SellerRequestDto
   */
  public async createSellerRequest(
    sellerReq: SellerRequestDto,
  ): Promise<ISellerRequest> {
    Logger.log(
      'Inside create seller request service',
      JSON.stringify(sellerReq),
    );
    const user = await this.sellerRequestModel(sellerReq);
    return user.save();
  }

  /**
   * Function to update user based on the userId
   * @param sellerReq: SellerRequestDto
   * @param reqId: string
   */
  public async updateSellerRequest(
    sellerReq: SellerRequestDto,
    reqId: string,
  ): Promise<ISellerRequest> {
    Logger.log(
      `Inside get update seller request service: ${reqId}`,
      JSON.stringify(sellerReq),
    );
    return await this.sellerRequestModel.findByIdAndUpdate(reqId, sellerReq, {
      new: true,
    });
  }
}
