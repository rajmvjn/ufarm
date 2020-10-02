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

import { SellService } from './sell.service';
import { SellDto } from './dto/sell-dto';
import { ISell } from './interfaces/sell.interface';
import { sell_module_content } from './sell-module-content';
import { constants } from '../constants';

@Controller('v1')
@ApiTags('Items')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  /**
   * Function to create new sell item based on the provided data
   * @param createSellDto : SellDto
   * @param response: Response
   */
  @Post('sell')
  @ApiOperation({ summary: 'Create sell product based on the provided data' })
  @ApiResponse({ status: HttpStatus.CREATED, description: constants.created })
  public async createItem(
    @Body() createSellDto: SellDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.sellService
      .createItem(createSellDto)
      .then(createSellResponse => {
        Logger.log(
          sell_module_content.sell_add_success_message,
          JSON.stringify(createSellResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: sell_module_content.sell_add_success_message,
          _id: createSellResponse['_id'],
          image_url: createSellResponse.image_url,
        });
      });
  }

  /**
   * Function to update sell prouduct based on the itemId
   * @param updateSellDto : SellDto
   * @param itemId: string
   */
  @Put('sell/:itemId')
  @ApiOperation({ summary: 'Update sell item based on item id' })
  @ApiResponse({ status: HttpStatus.OK, type: SellDto })
  public async updateSell(
    @Body() updateSellDto: SellDto,
    @Param('itemId') itemId: string,
  ): Promise<ISell> {
    return this.sellService.updateItem(updateSellDto, itemId);
  }

  /**
   * Function to get all items
   *
   */
  @Get('sell')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, type: SellDto })
  public async getAll(): Promise<ISell[]> {
    return this.sellService.getAllItems();
  }

  /**
   * Function to get item by Id
   * @param itemId: string
   */
  @Get('sell/:itemId')
  @ApiOperation({ summary: 'Get item by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: SellDto })
  public async getSell(@Param('itemId') itemId: string): Promise<ISell> {
    return this.sellService.getItem(itemId);
  }

  /**
   * Function to delete item by Id
   * @param itemId: string
   * @param response: Response
   */
  @Delete('sell/:itemId')
  @ApiOperation({ summary: 'Delete item by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: constants.no_content,
  })
  public async deleteItem(
    @Param('itemId') itemId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.sellService.deleteItem(itemId).then(frmRqDeleteResponse => {
      Logger.log(
        sell_module_content.sell_add_success_message,
        JSON.stringify(frmRqDeleteResponse),
      );
      return response.status(HttpStatus.NO_CONTENT).send({
        success: true,
        message: sell_module_content.sell_add_success_message,
      });
    });
  }
}
