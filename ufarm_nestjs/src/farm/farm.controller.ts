import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  Res,
  HttpStatus,
  Logger,
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

import { diskStorage, MulterFile } from 'multer';

import { Response } from 'express';

import { FarmService } from './farm.service';
import { FarmDto } from './dto/farm.dto';
import { FarmSupportDto } from './dto/farm-support.dto';
import { farm_module_content } from './farm-module-content';
import { constants } from '../constants';
import {
  imageFileFilter,
  editFileName,
} from '../shared/utils/file-upload.util';
import { ApiFarmProduct } from './decorators/farm-product.decorator';
import { FirestoreService } from '../firestore/firestore.service';
import { processResponse } from 'src/shared/utils/util';

@Controller('v1')
export class FarmController {
  constructor(
    private readonly farmService: FarmService,
    private readonly firestoreService: FirestoreService,
  ) {}

  /**
   * Function to create new farm request based on the provided data
   * @param createFarmProductDto : FarmDto
   * @param file: MulterFile
   * @param response: Response
   */
  @Post('farm')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Create Farm product' })
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiFarmProduct('product_image')
  @ApiResponse({ status: HttpStatus.OK })
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
  public async createFarmProduct(
    @Body() createFarmProductDto: FarmDto,
    @UploadedFile() productImage: MulterFile,
    @Res() response: Response,
  ): Promise<Response> {
    createFarmProductDto.image_url = productImage.filename;
    return this.farmService
      .createFarmProduct(createFarmProductDto)
      .then(frmRqCreateResponse => {
        Logger.log(
          farm_module_content.farm_add_success_message,
          JSON.stringify(frmRqCreateResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          _id: frmRqCreateResponse['id'],
          image_url: frmRqCreateResponse['image_url'],
          success: true,
          message: farm_module_content.farm_add_success_message,
        });
      });
  }

  /**
   * Function to update farm product based on the Id
   * @param updateFarmProductDto : FarmDto
   * @param productImage: MulterFile
   *  @param farmId: string
   * @param res: Response
   */
  @Put('farm/:farmId')
  @ApiTags('Farm')
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiFarmProduct('product_image')
  @ApiOperation({ summary: 'Update Farm Product' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
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
  public async updateFarmProduct(
    @Body() updateFarmProductDto: FarmDto,
    @UploadedFile() productImage: MulterFile,
    @Param('farmId') farmId: string,
    @Res() res: Response,
  ): Promise<any> {
    if (productImage) {
      updateFarmProductDto.image_url = productImage.filename;
    }
    updateFarmProductDto.date_updated = this.firestoreService.timestamp();
    return this.farmService
      .updateFarmProduct(updateFarmProductDto, farmId)
      .then(() => {
        res.send({
          _id: farmId,
          ...updateFarmProductDto,
        });
      });
  }

  /**
   * Function to get all farm Product
   * @param res: Response
   */
  @Get('farm')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Get all farm products' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
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
    return this.farmService.getAll().then(getAllData => {
      const getAllResult = processResponse(getAllData);
      Logger.log(
        farm_module_content.get_all_farm_item_success_message,
        JSON.stringify(getAllResult),
      );
      res.send(getAllResult);
    });
  }

  /**
   * Function to get farm product by Id
   * @param farmId: string
   * @param res: Response
   */
  @Get('farm/:farmId')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Get farm product detail by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
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
  public async getFarmProduct(
    @Param('farmId') farmId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.farmService.getFarmProductById(farmId).then(farmProductData => {
      Logger.log(
        farm_module_content.get_farm_item_success_message,
        JSON.stringify(farmId),
      );
      res.send({
        _id: farmProductData.id,
        ...farmProductData.data(),
      });
    });
  }

  /**
   * Function to delete farm product by Id
   * @param farmId: string
   * @param response: Response
   */
  @Delete('farm/:farmId')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Delete farm product by Id' })
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
  public async deleteFarmProduct(
    @Param('farmId') farmId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService.deleteFarmProduct(farmId).then(() => {
      Logger.log(
        farm_module_content.farm_delete_success_message,
        JSON.stringify(farmId),
      );
      return response.status(HttpStatus.NO_CONTENT).send({
        success: true,
        message: farm_module_content.farm_delete_success_message,
      });
    });
  }

  /**
   * Function to create new farm support based on the provided data
   * @param createFarmSupportRequestDto : FarmSupportDto
   * @param response: Response
   */
  @Post('farm-support')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Create Farm support request' })
  @ApiResponse({ status: HttpStatus.OK, description: constants.created })
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
  @HttpCode(HttpStatus.OK)
  public async createFarmSupportRequest(
    @Body() createFarmSupportRequestDto: FarmSupportDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService
      .createFarmSupport(createFarmSupportRequestDto)
      .then(frmSupportCreateResponse => {
        Logger.log(
          farm_module_content.farm_support_add_success_message,
          JSON.stringify(createFarmSupportRequestDto),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: farm_module_content.farm_support_add_success_message,
          _id: frmSupportCreateResponse['id'],
        });
      });
  }

  /**
   * Function to update farm support based on the farmId
   * @param updateFarmSupportDto : FarmDto
   * @param farmSupportId: string
   * @param res: Response
   */
  @Put('farm-support/:farmSupportId')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Update Farm support' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
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
  public async updateFarmSupport(
    @Body() updateFarmSupportDto: FarmSupportDto,
    @Param('farmSupportId') farmSupportId: string,
    @Res() res: Response,
  ): Promise<any> {
    updateFarmSupportDto.date_updated = this.firestoreService.timestamp();
    return this.farmService
      .updateFarmSupport(updateFarmSupportDto, farmSupportId)
      .then(() => {
        res.send({
          _id: farmSupportId,
          ...updateFarmSupportDto,
        });
      });
  }

  /**
   * Function to get all farm support request
   * @param res: Response
   */
  @Get('farm-supports')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Get all farm supports' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmSupportDto })
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
  public async getAllFarmSupport(@Res() res: Response): Promise<any> {
    return this.farmService.getAllFarmSupport().then(farmSupportData => {
      const farmSupportResult = processResponse(farmSupportData);
      Logger.log(
        farm_module_content.get_all_farm_support_success_message,
        JSON.stringify(farmSupportResult),
      );
      res.send(farmSupportResult);
    });
  }

  /**
   * Function to get farm support by Id
   * @param farmSupportId: string
   * @param res: Response
   */
  @Get('farm-support/:farmSupportId')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Get farm support detail by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmSupportDto })
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
  public async getFarmSupport(
    @Param('farmSupportId') farmSupportId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.farmService
      .getFarmSupportById(farmSupportId)
      .then(farmSupportData => {
        Logger.log(
          farm_module_content.get_farm_support_success_message,
          JSON.stringify(farmSupportId),
        );
        res.send({
          _id: farmSupportData.id,
          ...farmSupportData.data(),
        });
      });
  }

  /**
   * Function to delete farm support by Id
   * @param farmSupportId: string
   * @param response: Response
   */
  @Delete('farm-support/:farmSupportId')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Delete farm support by Id' })
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
  public async deleteFarmSupport(
    @Param('farmSupportId') farmSupportId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService.deleteFarmSupport(farmSupportId).then(() => {
      Logger.log(
        farm_module_content.farm_support_delete_success_message,
        JSON.stringify(farmSupportId),
      );
      return response.status(HttpStatus.NO_CONTENT).send({
        success: true,
        message: farm_module_content.farm_support_delete_success_message,
      });
    });
  }
}
