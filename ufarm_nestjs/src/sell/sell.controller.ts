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

import { SellService } from './sell.service';
import { SellDto } from './dto/sell-dto';
import { ISell } from './interfaces/sell.interface';
import { sell_module_content } from './sell-module-content';
import { constants } from '../constants';
import {
  imageFileFilter,
  editFileName,
} from '../shared/utils/file-upload.util';
import { ApiSellProduct } from './decorators/sell.decorator';

@Controller('v1')
@ApiTags('Items')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  /**
   * Function to create new sell item based on the provided data
   * @param createSellDto : SellDto
   * @param response: Response
   * @param sellImage: MulterFile
   */
  @Post('sell')
  @ApiOperation({ summary: 'Create sell product based on the provided data' })
  @ApiResponse({ status: HttpStatus.CREATED, description: constants.created })
  @UseInterceptors(
    FileInterceptor('sell_image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiSellProduct('sell_image')
  public async createItem(
    @Body() createSellDto: SellDto,
    @Res() response: Response,
    @UploadedFile() sellImage: MulterFile,
  ): Promise<Response> {
    createSellDto.image_url = sellImage && sellImage.filename;
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
   * @param sellImage: MulterFile
   */
  @Put('sell/:itemId')
  @ApiOperation({ summary: 'Update sell item based on item id' })
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
  @ApiResponse({ status: HttpStatus.OK, type: SellDto })
  @UseInterceptors(
    FileInterceptor('sell_image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiSellProduct('sell_image')
  public async updateSell(
    @Body() updateSellDto: SellDto,
    @Param('itemId') itemId: string,
    @UploadedFile() sellImage: MulterFile,
  ): Promise<ISell> {
    if (sellImage) {
      updateSellDto.image_url = sellImage.filename;
    }
    return this.sellService.updateItem(updateSellDto, itemId);
  }

  /**
   * Function to get all items
   *
   */
  @Get('sell')
  @ApiOperation({ summary: 'Get all items' })
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

  /**
   * Function to get sell item based on the seller id
   *
   */
  @Get('sell-items/:sellerId')
  @ApiOperation({ summary: 'Get Seller items' })
  @ApiResponse({ status: HttpStatus.OK, type: SellDto })
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
  public async getSellerItems(
    @Param('sellerId') sellerId: string,
  ): Promise<ISell[]> {
    return this.sellService.getSellerItems(sellerId);
  }

  /**
   * Function to get buy items other than seller item
   *
   */
  @Get('buy-items/:sellerId')
  @ApiOperation({ summary: 'Get Buyer items' })
  @ApiResponse({ status: HttpStatus.OK, type: SellDto })
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
  public async getBuyerItems(
    @Param('sellerId') sellerId: string,
  ): Promise<ISell[]> {
    return this.sellService.getBuyerItems(sellerId);
  }
}
