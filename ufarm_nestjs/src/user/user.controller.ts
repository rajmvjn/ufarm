import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  Res,
  Logger,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { Response } from 'express';
import { MulterFile } from 'multer';
import * as admin from 'firebase-admin';

import { UserService } from './user.service';
import { UserDto, AuthUserDto } from './dto/user-dto';
import { IUser } from './interfaces/user.interface';
import { SellerRequestDto } from './dto/seller-request.dto';
import { user_module_content } from './user-module-content';
import { constants } from '../constants';
import {
  imageFileFilter,
  editFileName,
  uploadImageToStorage,
} from '../shared/utils/file-upload.util';
import { processResponse } from '../shared/utils/util';
import { ApiUser } from './decorators/user-decorator';
import { ISellerRequest } from './interfaces/seller-request.interface';
import * as config from '../config/configuration';

@Controller('v1')
export class UserController {
  public users: IUser[] = [];
  private storageBucket: any;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.storageBucket = admin.storage().bucket();
  }

  /**
   * Function to create new user based on the provided data
   * @param createUserDto : UserDto
   * @param profileImage: MulterFile
   * @param res: Response
   */
  @Post('user')
  @ApiTags('User')
  @ApiOperation({ summary: 'Create user' })
  @UseInterceptors(
    FileInterceptor('profile_image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: config.default().UPLOAD_LIMIT_MB * 1024 * 1024, // Allowed file upload size is 5mb can be configurable
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiUser('profile_image')
  @ApiResponse({ status: HttpStatus.CREATED, description: constants.created })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public createUser(
    @Body() createUserDto: UserDto,
    @UploadedFile() profileImage: MulterFile,
    @Res() res: Response,
  ): any {
    // Image upload to firebase store
    profileImage.filename = editFileName(profileImage);
    createUserDto.avatar = profileImage.filename;
    uploadImageToStorage(profileImage, this.storageBucket);

    return this.userService
      .createUser(createUserDto)
      .then(createUserResponse => {
        Logger.log(
          user_module_content.user_create_success_message,
          JSON.stringify(createUserDto),
        );
        return res.status(HttpStatus.CREATED).send({
          success: true,
          message: user_module_content.user_create_success_message,
          _id: createUserResponse['id'],
          avatar: createUserResponse.avatar,
        });
      });
  }

  /**
   * Function to update user based on the userId
   * @param updateUserDto : UserDto
   * @param userId: string
   * @param profileImage: MulterFile
   * @param res: Response
   */
  @Put('user/:userId')
  @ApiTags('User')
  @ApiOperation({ summary: 'Update user based on user id' })
  @UseInterceptors(
    FileInterceptor('profile_image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: config.default().UPLOAD_LIMIT_MB * 1024 * 1024, // Allowed file upload size is 5mb can be configurable
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiUser('profile_image')
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async updateUser(
    @Body() updateUserDto: UserDto,
    @UploadedFile() profileImage: MulterFile,
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<any> {
    if (profileImage) {
      // Image upload to firebase store
      profileImage.filename = editFileName(profileImage);
      updateUserDto.avatar = profileImage.filename;
      uploadImageToStorage(profileImage, this.storageBucket);
    }
    this.userService.updateUser(updateUserDto, userId).then(() => {
      res.send({
        _id: userId,
        ...updateUserDto,
      });
    });
  }

  /**
   * Function to get all users
   * @param res: Response
   */
  @Get('users')
  @ApiTags('User')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async getAll(@Res() res: Response): Promise<any> {
    this.userService
      .getAllUser()
      .then(getAllUsers => {
        const usersResult = processResponse(getAllUsers) as IUser[];
        Logger.log(
          user_module_content.users_get_success_message,
          JSON.stringify(usersResult),
        );
        res.send(usersResult);
      })
      .catch(error => {
        Logger.log(user_module_content.get_users_error_message, error);
        res.status(400).send('Error in processing user list');
      });
  }

  /**
   * Function to get user by email and password
   * @param userId: string
   * @param res: Response
   */
  @Post('auth')
  @ApiTags('User')
  @ApiOperation({ summary: 'get user authenticated' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @HttpCode(HttpStatus.OK)
  public async getUserAuth(
    @Body() user: AuthUserDto,
    @Res() res: Response,
  ): Promise<any> {
    Logger.log(JSON.stringify(user));
    return this.userService
      .getUserAuthenticated(user)
      .then(authenticatedUser => {
        const data = processResponse(authenticatedUser) as IUser[];
        res.send(data);
      });
  }

  /**
   * Function to get user by Id
   * @param userId: string
   * @param res: Response
   */
  @Get('user/:userId')
  @ApiTags('User')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async getUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.userService.getUser(userId).then(userData => {
      Logger.log(
        `${user_module_content.user_get_success_message}_${userId}`,
        JSON.stringify(userData.data()),
      );
      res.send({
        _id: userData.id,
        ...userData.data(),
      });
    });
  }

  /**
   * Function to delete user by Id
   * @param userId: string
   * @param res: Response
   */
  @Delete('user/:userId')
  @ApiTags('User')
  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: constants.no_content,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async deleteUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<Response> {
    return this.userService.deleteUser(userId).then(() => {
      Logger.log(
        user_module_content.user_delete_success_message,
        JSON.stringify(userId),
      );
      return res
        .status(HttpStatus.NO_CONTENT)
        .send(user_module_content.user_delete_success_message);
    });
  }

  /**
   * Function to create seller request based on the provided data
   * @param createSellerDto : SellerRequestDto
   * @param res: Response
   */
  @Post('seller-request')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Create seller request' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async createSellerRequest(
    @Body() createSellerDto: SellerRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.userService
      .createSellerRequest(createSellerDto)
      .then(createSellerSuccess => {
        Logger.log(
          'Inside success function of seller request',
          JSON.stringify(createSellerDto),
        );
        return res.status(HttpStatus.CREATED).send({
          success: true,
          message: user_module_content.seller_create_success_message,
          _id: createSellerSuccess['id'],
        });
      });
  }

  /**
   * Function to update seller request based on the userId
   * @param updateSellerDto : SellerRequestDto
   * @param reqId: string
   * @param res: Response
   */
  @Put('seller-request/:reqId')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Update seller request based on req id' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async updateSellerRequest(
    @Body() updateSellerDto: SellerRequestDto,
    @Param('reqId') reqId: string,
    @Res() res: Response,
  ): Promise<any> {
    updateSellerDto.date_updated = new Date().getTime();
    this.userService.updateSellerRequest(updateSellerDto, reqId).then(() => {
      res.send({
        _id: reqId,
        ...updateSellerDto,
      });
    });
  }

  /**
   * Function to get all seller request
   * @param res: Response
   */
  @Get('seller-requests')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Get all seller requests' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async getAllRequest(@Res() res: Response): Promise<any> {
    this.userService.getAllRequest().then(allRequest => {
      const sellerRequestResult = processResponse(
        allRequest,
      ) as ISellerRequest[];
      Logger.log(
        user_module_content.get_users_request_success_message,
        JSON.stringify(sellerRequestResult),
      );
      res.send(sellerRequestResult);
    });
  }

  /**
   * Function to get seller request by Id
   * @param reqId: string
   * @param res: Response
   */
  @Get('seller-request/:reqId')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Get seller request by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async getSellerRequest(
    @Param('reqId') reqId: string,
    @Res() res: Response,
  ): Promise<any> {
    this.userService.getSellerRequest(reqId).then(sellerRq => {
      res.send({
        _id: sellerRq.id,
        ...sellerRq.data(),
      });
    });
  }

  /**
   * Function to delete seller request by Id
   * @param reqId: string
   * @param res: Response
   */
  @Delete('seller-request/:reqId')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Delete seller request by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async deleteSellerRequest(
    @Param('reqId') sellerReqId: string,
    @Res() res: Response,
  ): Promise<Response> {
    return this.userService.deleteSellerRequest(sellerReqId).then(() => {
      Logger.log(
        user_module_content.seller_delete_success_message,
        JSON.stringify(sellerReqId),
      );
      return res
        .status(HttpStatus.NO_CONTENT)
        .send(user_module_content.seller_delete_success_message);
    });
  }
}
