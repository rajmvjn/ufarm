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
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { diskStorage, MulterFile } from 'multer';

import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';
import { IUser } from './interfaces/user.interface';
import { SellerRequestDto } from './dto/seller-request.dto';
import { ISellerRequest } from './interfaces/seller-request.interface';
import { user_module_content } from './user-module-content';
import { constants } from '../constants';
import {
  imageFileFilter,
  editFileName,
} from '../shared/utils/file-upload.util';
import { ApiUser } from './decorators/user-decorator';

@Controller('v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Function to create new user based on the provided data
   * @param createUserDto : UserDto
   * @param profileImage: MulterFile
   * @param response: Response
   */
  @Post('user')
  @ApiTags('User')
  @ApiOperation({ summary: 'Create user' })
  @UseInterceptors(
    FileInterceptor('profile_image', {
      storage: diskStorage({
        destination: `./${constants.IMAGE_FOLDER}`,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiUser('profile_image')
  @ApiResponse({ status: HttpStatus.CREATED, description: constants.created })
  public async createUser(
    @Body() createUserDto: UserDto,
    @UploadedFile() profileImage: MulterFile,
    @Res() response: Response,
  ): Promise<Response> {
    createUserDto.avatar = profileImage.filename;
    return this.userService
      .createUser(createUserDto)
      .then(createUserResponse => {
        Logger.log(
          user_module_content.user_create_success_message,
          JSON.stringify(createUserResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: user_module_content.user_create_success_message,
        });
      });
  }

  /**
   * Function to update user based on the userId
   * @param updateUserDto : UserDto
   * @param userId: string
   */
  @Put('user/:userId')
  @ApiTags('User')
  @ApiOperation({ summary: 'Update user based on user id' })
  @UseInterceptors(
    FileInterceptor('profile_image', {
      storage: diskStorage({
        destination: `./${constants.IMAGE_FOLDER}`,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiUser('profile_image')
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  public async updateUser(
    @Body() updateUserDto: UserDto,
    @UploadedFile() profileImage: MulterFile,
    @Param('userId') userId: string,
  ): Promise<IUser> {
    updateUserDto.avatar = profileImage.filename;
    return this.userService.updateUser(updateUserDto, userId);
  }

  /**
   * Function to get all users
   *
   */
  @Get('users')
  @ApiTags('User')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  public async getAll(): Promise<IUser[]> {
    return this.userService.getAllUser();
  }

  /**
   * Function to get user by Id
   * @param userId: string
   */
  @Get('user/:userId')
  @ApiTags('User')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  public async getUser(@Param('userId') userId: string): Promise<IUser> {
    return this.userService.getUser(userId);
  }

  /**
   * Function to delete user by Id
   * @param userId: string
   * @param response: Response
   */
  @Delete('user/:userId')
  @ApiTags('User')
  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: constants.no_content,
  })
  public async deleteUser(
    @Param('userId') userId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.userService.deleteUser(userId).then(deleteUserResponse => {
      Logger.log(
        user_module_content.user_delete_success_message,
        JSON.stringify(deleteUserResponse),
      );
      return response
        .status(HttpStatus.NO_CONTENT)
        .send(user_module_content.user_delete_success_message);
    });
  }

  /**
   * Function to create seller request based on the provided data
   * @param createSellerDto : SellerRequestDto
   * @param response: Response
   */
  @Post('seller-request')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Create seller request' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  public async createSellerRequest(
    @Body() createSellerDto: SellerRequestDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.userService
      .createSellerRequest(createSellerDto)
      .then(createSellerSuccess => {
        Logger.log(
          'Inside success function of seller request',
          JSON.stringify(createSellerSuccess),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: user_module_content.seller_create_success_message,
        });
      });
  }

  /**
   * Function to update seller request based on the userId
   * @param updateSellerDto : SellerRequestDto
   * @param reqId: string
   */
  @Put('seller-request/:reqId')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Update seller request based on req id' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  public async updateSellerRequest(
    @Body() updateSellerDto: SellerRequestDto,
    @Param('reqId') reqId: string,
  ): Promise<ISellerRequest> {
    return this.userService.updateSellerRequest(updateSellerDto, reqId);
  }

  /**
   * Function to get all seller request
   *
   */
  @Get('seller-requests')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Get all seller requests' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  public async getAllRequest(): Promise<ISellerRequest[]> {
    return this.userService.getAllRequest();
  }

  /**
   * Function to get seller request by Id
   * @param reqId: string
   */
  @Get('seller-request/:reqId')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Get seller request by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: SellerRequestDto })
  public async getSellerRequest(
    @Param('reqId') reqId: string,
  ): Promise<ISellerRequest> {
    return this.userService.getSellerRequest(reqId);
  }

  /**
   * Function to delete seller request by Id
   * @param reqId: string
   * @param response: Response
   */
  @Delete('seller-request/:reqId')
  @ApiTags('Seller Request')
  @ApiOperation({ summary: 'Delete seller request by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  public async deleteSellerRequest(
    @Param('reqId') reqId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.userService
      .deleteSellerRequest(reqId)
      .then(deleteSellerResponse => {
        Logger.log(
          user_module_content.seller_delete_success_message,
          JSON.stringify(deleteSellerResponse),
        );
        return response
          .status(HttpStatus.NO_CONTENT)
          .send(user_module_content.seller_delete_success_message);
      });
  }
}
