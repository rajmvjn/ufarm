import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsOptional,
  IsDefined,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly cart_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly item_id: string;

  @ApiProperty()
  @IsNumber()
  readonly quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly sell_user_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly buy_user_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty()
  @IsOptional()
  readonly created_on: Date;

  @ApiProperty()
  @IsOptional()
  readonly updated_on: Date;
}
