import { Injectable, Logger } from '@nestjs/common';

import { IUser } from './interfaces/user.interface';
import { ISellerRequest } from './interfaces/seller-request.interface';
import { UserDto, AuthUserDto } from './dto/user-dto';
import { SellerRequestDto } from './dto/seller-request.dto';
import { FirestoreService } from '../firestore/firestore.service';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  private userCollection: any;
  private sellerRequestCollection: any;
  constructor(private readonly firestoreService: FirestoreService) {
    this.userCollection = admin.firestore().collection('users');
    this.sellerRequestCollection = admin
      .firestore()
      .collection('seller_request');
  }

  /**
   * Function to return the list of user
   */
  public async getAllUser(): Promise<any> {
    Logger.log('Inside get all user service');
    return await this.userCollection
      .get()
      .catch(getAllUserError => getAllUserError);
  }

  /**
   * Function to get user based on the provided user Id
   * @param userId: string
   */
  public async getUserAuthenticated(user: AuthUserDto): Promise<IUser> {
    Logger.log(`Inside get user by id service: ${user.email}`);
    return await this.userCollection
      .where('email', '==', user.email)
      .where('password', '==', user.password)
      .get();
  }

  /**
   * Function to create user
   * @param userReq: UserDto
   */
  public async createUser(userReq: UserDto): Promise<any> {
    Logger.log('Inside create user service', JSON.stringify(userReq));
    userReq.date_created = this.firestoreService.timestamp();
    return await this.userCollection.add(Object.assign({}, userReq));
  }

  /**
   * Function to update user based on the userId
   * @param userReq: UserDto
   * @param userId: string
   */
  public async updateUser(userReq: UserDto, userId: string): Promise<IUser> {
    userReq.date_updated = this.firestoreService.timestamp();
    Logger.log(
      `Inside get update user service: ${userId}`,
      JSON.stringify(userReq),
    );
    return await this.userCollection
      .doc(userId)
      .update(Object.assign({}, userReq));
  }

  /**
   * Function to get user based on the provided user Id
   * @param userId: string
   */
  public async getUser(userId: string): Promise<IUser> {
    Logger.log(`Inside get user by id service: ${userId}`);
    return await this.userCollection.doc(userId).get();
  }

  /**
   * Function to delete user based on the provided user Id
   * @param userId: string
   */
  public async deleteUser(userId: string): Promise<string> {
    Logger.log(`Inside delete user by id service: ${userId}`);
    return await this.userCollection.doc(userId).delete();
  }

  /**
   * Function to get seller request based on the provided user Id
   * @param reqId: string
   */
  public async getSellerRequest(reqId: string): Promise<ISellerRequest> {
    Logger.log(`Inside get seller request by id service: ${reqId}`);
    return await this.sellerRequestCollection.doc(reqId);
  }

  /**
   * Function to delete seller request based on the provided request Id
   * @param reqId: string
   */
  public async deleteSellerRequest(reqId: string): Promise<string> {
    Logger.log(`Inside delete seller request by id service: ${reqId}`);
    return await this.sellerRequestCollection.doc(reqId).delete();
  }

  /**
   * Function to return the list of Seller requests
   */
  public async getAllRequest(): Promise<ISellerRequest[]> {
    Logger.log('Inside get all seller request service');
    return await this.sellerRequestCollection.get();
  }

  /**
   * Function to create user
   * @param sellerReq: SellerRequestDto
   */
  public async createSellerRequest(sellerReq: SellerRequestDto): Promise<any> {
    sellerReq.date_created = this.firestoreService.timestamp();
    Logger.log(
      'Inside create seller request service',
      JSON.stringify(sellerReq),
    );
    return await this.sellerRequestCollection.add(Object.assign({}, sellerReq));
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
    return await this.sellerRequestCollection
      .doc(reqId)
      .update(Object.assign({}, sellerReq));
  }
}
