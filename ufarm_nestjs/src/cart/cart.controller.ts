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
import { ICart } from './interfaces/cart.interface';
import { cart_module_content } from './cart-module-content';
import { constants } from '../constants';

@Controller('v1')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Function to create new cart based on the provided data
   * @param createCartDto : CartDto
   * @param response: Response
   */
  @Post('cart')
  @ApiOperation({ summary: 'Create cart' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
  public async createCart(
    @Body() createCartDto: CartDto,
    @Res() response: Response,
  ): Promise<Response> {
    return this.cartService
      .createCart(createCartDto)
      .then(cartCreateResponse => {
        Logger.log(
          cart_module_content.cart_add_success_message,
          JSON.stringify(cartCreateResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: cart_module_content.cart_add_success_message,
        });
      });
  }

  /**
   * Function to update cart based on the cartId
   * @param updateCartDto : CartDto
   * @param cartId: string
   */
  @Put('cart/:cartId')
  @ApiOperation({ summary: 'Update cart based on cart id' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
  public async updateCart(
    @Body() updateCartDto: CartDto,
    @Param('cartId') cartId: string,
  ): Promise<ICart> {
    return this.cartService.updateCart(updateCartDto, cartId);
  }

  /**
   * Function to get all carts
   *
   */
  @Get('carts')
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
  public async getAll(): Promise<ICart[]> {
    return this.cartService.getAllCart();
  }

  /**
   * Function to get cart by Id
   * @param cartId: string
   */
  @Get('cart/:cartId')
  @ApiOperation({ summary: 'Get cart by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CartDto })
  public async getCart(@Param('cartId') cartId: string): Promise<ICart> {
    return this.cartService.getCart(cartId);
  }

  /**
   * Function to delete cart by Id
   * @param cartId: string
   * @param response: Response
   */
  @Delete('cart/:cartId')
  @ApiOperation({ summary: 'Delete cart by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: constants.no_content,
  })
  public async deleteCart(
    @Param('cartId') cartId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.cartService.deleteCart(cartId).then(cartResponse => {
      Logger.log(
        cart_module_content.cart_delete_success_message,
        JSON.stringify(cartResponse),
      );
      return response
        .status(HttpStatus.NO_CONTENT)
        .send(cart_module_content.cart_delete_success_message);
    });
  }
}
