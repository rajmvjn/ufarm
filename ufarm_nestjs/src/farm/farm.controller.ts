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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { FarmService } from './farm.service';
import { FarmDto } from './dto/farm.dto';
import { FarmSupportDto } from './dto/farm-support.dto';
import { IFarm } from './interfaces/farm.interface';
import { IFarmSupport } from './interfaces/farm-support.interface';
import { farm_module_content } from './farm-module-content';
import { constants } from '../constants';

@Controller('v1')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  /**
   * Function to create new farm request based on the provided data
   * @param createFarmProductDto : FarmDto
   * @param response: Response
   */
  @Post('farm-product')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Create Farm product' })
  @ApiResponse({ status: HttpStatus.CREATED, description: constants.created })
  public async createFarmProduct(
    @Body() createFarmProductDto: FarmDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService
      .createFarmProduct(createFarmProductDto)
      .then(frmRqCreateResponse => {
        Logger.log(
          farm_module_content.farm_add_success_message,
          JSON.stringify(frmRqCreateResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: farm_module_content.farm_add_success_message,
        });
      });
  }

  /**
   * Function to update farm product based on the Id
   * @param updateFarmProductDto : FarmDto
   */
  @Put('farm/:farmId')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Update Farm Product' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
  public async updateFarmProduct(
    @Body() updateFarmProductDto: FarmDto,
    @Param('farmId') farmId: string,
  ): Promise<IFarm> {
    return this.farmService.updateFarmProduct(updateFarmProductDto, farmId);
  }

  /**
   * Function to get all farm Product
   *
   */
  @Get('farm-products')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Get all farm products' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
  public async getAll(): Promise<IFarm[]> {
    return this.farmService.getAll();
  }

  /**
   * Function to get farm product by Id
   * @param farmId: string
   */
  @Get('farm-product/:farmId')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Get farm product detail by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
  public async getFarmProduct(@Param('farmId') farmId: string): Promise<IFarm> {
    return this.farmService.getFarmProductById(farmId);
  }

  /**
   * Function to delete farm product by Id
   * @param farmId: string
   * @param response: Response
   */
  @Delete('farm-request/:farmId')
  @ApiTags('Farm')
  @ApiOperation({ summary: 'Delete farm product by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: constants.no_content,
  })
  public async deleteFarmProduct(
    @Param('farmId') farmId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService
      .deleteFarmProduct(farmId)
      .then(frmRqDeleteResponse => {
        Logger.log(
          farm_module_content.farm_delete_success_message,
          JSON.stringify(frmRqDeleteResponse),
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
  @ApiResponse({ status: HttpStatus.CREATED, description: constants.created })
  public async createFarmSupportRequest(
    @Body() createFarmSupportRequestDto: FarmSupportDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService
      .createFarmSupport(createFarmSupportRequestDto)
      .then(frmSupportCreateResponse => {
        Logger.log(
          farm_module_content.farm_support_add_success_message,
          JSON.stringify(frmSupportCreateResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: farm_module_content.farm_support_add_success_message,
        });
      });
  }

  /**
   * Function to update farm support based on the farmId
   * @param updateFarmSupportDto : FarmDto
   * @param farmSupportId: string
   */
  @Put('farm-support/:farmSupportId')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Update Farm support' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmDto })
  public async updateFarmSupport(
    @Body() updateFarmSupportDto: FarmSupportDto,
    @Param('farmSupportId') farmSupportId: string,
  ): Promise<IFarmSupport> {
    return this.farmService.updateFarmSupport(
      updateFarmSupportDto,
      farmSupportId,
    );
  }

  /**
   * Function to get all farm support request
   *
   */
  @Get('farm-supports')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Get all farm supports' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmSupportDto })
  public async getAllFarmSupport(): Promise<IFarmSupport[]> {
    return this.farmService.getAllFarmSupport();
  }

  /**
   * Function to get farm support by Id
   * @param farmSupportId: string
   */
  @Get('farm-support/:farmSupportId')
  @ApiTags('Farm Support')
  @ApiOperation({ summary: 'Get farm support detail by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: FarmSupportDto })
  public async getFarmSupport(
    @Param('farmSupportId') farmSupportId: string,
  ): Promise<IFarmSupport> {
    return this.farmService.getFarmSupportById(farmSupportId);
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
  public async deleteFarmSupport(
    @Param('farmSupportId') farmSupportId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.farmService
      .deleteFarmSupport(farmSupportId)
      .then(frmSupportDeleteResponse => {
        Logger.log(
          farm_module_content.farm_support_delete_success_message,
          JSON.stringify(frmSupportDeleteResponse),
        );
        return response.status(HttpStatus.NO_CONTENT).send({
          success: true,
          message: farm_module_content.farm_support_delete_success_message,
        });
      });
  }
}
