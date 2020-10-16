import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  Logger,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { CartService } from './cart.service';
import { CartDto } from './dto/cart-dto';
import { ICart, ICartItems } from './interfaces/cart.interface';
import { cart_module_content } from './cart-module-content';
import { constants } from '../constants';
import { FirestoreService } from '../firestore/firestore.service';
import { processResponse } from 'src/shared/utils/util';
import { ISell } from 'src/sell/interfaces/sell.interface';

@Controller('v1')
@ApiTags('Cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly firestoreService: FirestoreService,
  ) {}

  /**
   * Function to create new cart based on the provided data
   * @param createCartDto : CartDto
   * @param response: Response
   */
  @Post('cart')
  @ApiOperation({ summary: 'Create cart' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
  public async createCart(
    @Body() createCartDto: CartDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.cartService
      .createCart(createCartDto)
      .then(cartCreateResponse => {
        Logger.log(
          cart_module_content.cart_add_success_message,
          JSON.stringify(createCartDto),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: cart_module_content.cart_add_success_message,
          _id: cartCreateResponse['id'],
        });
      });
  }

  /**
   * Function to update cart based on the cartId
   * @param updateCartDto : CartDto
   * @param cartId: string
   * @param res: Response
   */
  @Put('cart/:cartId')
  @ApiOperation({ summary: 'Update cart based on cart id' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
  public async updateCart(
    @Body() updateCartDto: CartDto,
    @Param('cartId') cartId: string,
    @Res() res: Response,
  ): Promise<any> {
    updateCartDto.date_updated = this.firestoreService.timestamp();
    return this.cartService.updateCart(updateCartDto, cartId).then(() => {
      res.send({
        _id: cartId,
        ...updateCartDto,
      });
    });
  }

  /**
   * Function to get all carts
   * @param res: Response
   */
  @Get('cart')
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
    return this.cartService.getAllCart().then(getAllData => {
      const getAllResult = processResponse(getAllData);
      Logger.log(
        cart_module_content.get_all_cart_items_success_message,
        JSON.stringify(getAllResult),
      );
      res.send(getAllResult);
    });
  }

  /**
   * Function to get cart by Id
   * @param cartId: string
   * @param res: Response
   */
  @Get('cart/:cartId')
  @ApiOperation({ summary: 'Get cart by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
  public async getCart(
    @Param('cartId') cartId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.cartService.getCart(cartId).then(getCartData => {
      Logger.log(
        cart_module_content.get_cart_item_success_message,
        JSON.stringify(cartId),
      );
      res.send({
        _id: getCartData.id,
        ...getCartData.data(),
      });
    });
  }

  /**
   * Function to get cart by status
   * @param status: string
   * @param res: Response
   */
  @Get('cartbystatus/:status')
  @ApiOperation({ summary: 'Get cart by status' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
  public async getCartByStatus(
    @Param('status') status: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.cartService.getCartByStatus(status).then(cartByStatusData => {
      const cartByStatusResult = processResponse(cartByStatusData) as ICart[];
      res.send(cartByStatusResult);
    });
  }

  /**
   * Function to delete cart by Id
   * @param cartId: string
   * @param res: Response
   */
  @Delete('cart/:cartId')
  @ApiOperation({ summary: 'Delete cart by Id' })
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
  public async deleteCart(
    @Param('cartId') cartId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.cartService.deleteCart(cartId).then(() => {
      Logger.log(
        cart_module_content.cart_delete_success_message,
        JSON.stringify(cartId),
      );
      res
        .status(HttpStatus.NO_CONTENT)
        .send(cart_module_content.cart_delete_success_message);
    });
  }

  /**
   * Function to get cart detatils by seller id
   * @param sellerId: string
   * @param res: Response
   */
  @Get('seller-cart-items/:sellerId')
  @ApiOperation({ summary: 'Get cart details by Seller Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
  public async getSellerCartItems(
    @Param('sellerId') sellerId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.cartService
      .getBuyerCartItems(sellerId)
      .then(sellerCartItemData => {
        Logger.log(
          cart_module_content.get_seller_cart_item_success_message,
          JSON.stringify(sellerCartItemData),
        );
        const sellerCartItemResult = processResponse(
          sellerCartItemData,
        ) as ICart[];
        if (sellerCartItemResult && sellerCartItemResult.length) {
          const itemIds = sellerCartItemResult.map(
            cartItem => cartItem.item_id,
          );
          this.cartService
            .getProductDetails(itemIds)
            .subscribe(productsResponse => {
              if (productsResponse) {
                const sellerItems = this.processCartItemDetails(
                  sellerCartItemResult,
                  productsResponse,
                );
                res.send(sellerItems);
              } else {
                res.send([]);
              }
            });
        } else {
          res.send([]);
        }
      });
  }

  /**
   * Function to get cart detatils by buyer id
   * @param buyerId: string
   * @param res: Response
   */
  @Get('buyer-cart-items/:buyerId')
  @ApiOperation({ summary: 'Get cart details by Buyer Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
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
  public async getBuyerCartItems(
    @Param('buyerId') buyerId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.cartService
      .getBuyerCartItems(buyerId)
      .then(buyerCartItemData => {
        Logger.log(
          cart_module_content.get_buyer_cart_item_success_message,
          JSON.stringify(buyerCartItemData),
        );
        const buyerCartItemResult = processResponse(
          buyerCartItemData,
        ) as ICart[];
        if (buyerCartItemResult && buyerCartItemResult.length) {
          const itemIds = buyerCartItemResult.map(cartItem => cartItem.item_id);
          this.cartService
            .getProductDetails(itemIds)
            .subscribe(productsResponse => {
              if (productsResponse) {
                const buyerItems = this.processCartItemDetails(
                  buyerCartItemResult,
                  productsResponse,
                );
                res.send(buyerItems);
              } else {
                res.send([]);
              }
            });
        } else {
          res.send([]);
        }
      });
  }

  /**
   * Function to combine cart and sell item detail
   * @param buyerCartItems: ICart[]
   * @param productDetails: any
   */
  private processCartItemDetails(
    buyerCartItems: ICart[],
    productDetailSnapShot: any,
  ): ICartItems[] {
    const cartItems: ICartItems[] = [];
    Logger.log('processCartItemDetails', JSON.stringify(buyerCartItems));

    for (const product of productDetailSnapShot) {
      const sellItem = product.data() as ISell;

      const buyerCart = buyerCartItems.find(
        cartItem => cartItem.item_id === product.id,
      );
      Logger.log('buyerCart', JSON.stringify(buyerCart));
      Logger.log('productDetail', JSON.stringify(sellItem));
      cartItems.push({
        _id: buyerCart.id,
        item_id: buyerCart.item_id,
        cart_quantity: buyerCart.quantity,
        sell_user_id: buyerCart.sell_user_id,
        buy_user_id: buyerCart.buy_user_id,
        status: buyerCart.status,
        item_name: sellItem.name,
        item_description: sellItem.description,
        category_id: sellItem.category_id,
        farm_id: sellItem.farm_id,
        quantity_available: sellItem.quantity_available,
        offer_price_percentage: sellItem.offer_price_percentage,
        image_url: sellItem.image_url,
        item_status: sellItem.status,
        unit: sellItem.unit,
      });
    }
    return cartItems;
  }
}
