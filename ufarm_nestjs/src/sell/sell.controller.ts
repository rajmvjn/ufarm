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
import { processResponse } from 'src/shared/utils/util';
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
          JSON.stringify(createSellDto),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: sell_module_content.sell_add_success_message,
          _id: createSellResponse['id'],
          image_url: createSellResponse.image_url,
        });
      });
  }

  /**
   * Function to update sell prouduct based on the itemId
   * @param updateSellDto : SellDto
   * @param itemId: string
   * @param res: Response
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
    @Res() res: Response,
  ): Promise<any> {
    if (sellImage) {
      updateSellDto.image_url = sellImage.filename;
    }
    return this.sellService.updateItem(updateSellDto, itemId).then(() => {
      res.send({
        _id: itemId,
        ...updateSellDto,
      });
    });
  }

  /**
   * Function to get all items
   * @param res: Response
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
  public async getAll(@Res() res: Response): Promise<any> {
    return this.sellService.getAllItems().then(itemsData => {
      const itemsResult = processResponse(itemsData) as ISell[];
      Logger.log(
        sell_module_content.get_all_sell_items_success_message,
        JSON.stringify(itemsResult),
      );
      res.send(itemsResult);
    });
  }

  /**
   * Function to get item by Id
   * @param itemId: string
   * @param res: Response
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
  public async getSell(
    @Param('itemId') itemId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.sellService.getItem(itemId).then(getItemData => {
      res.send({
        _id: getItemData.id,
        ...getItemData.data(),
      });
    });
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
    return this.sellService.deleteItem(itemId).then(() => {
      Logger.log(
        sell_module_content.sell_add_success_message,
        JSON.stringify(itemId),
      );
      return response.status(HttpStatus.NO_CONTENT).send({
        success: true,
        message: sell_module_content.sell_add_success_message,
      });
    });
  }

  /**
   * Function to get sell item based on the seller id
   * @param res: Response
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
    @Res() res: Response,
  ): Promise<any> {
    return this.sellService.getSellerItems(sellerId).then(sellerItemData => {
      const sellerItemResult = processResponse(sellerItemData) as ISell[];
      res.send(sellerItemResult);
    });
  }

  /**
   * Function to get buy items other than seller item
   * @param res: Response
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
    @Res() res: Response,
  ): Promise<any> {
    return this.sellService.getBuyerItems(sellerId).then(buyerItemData => {
      const buyerItemResult = processResponse(buyerItemData) as ISell[];
      res.send(buyerItemResult);
    });
  }
}
