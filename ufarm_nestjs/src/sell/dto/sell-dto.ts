import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDefined,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class SellDto {
  @ApiProperty()
  @IsOptional()
  readonly item_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly category_id: string;

  @ApiProperty()
  @IsOptional()
  readonly farm_id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  readonly quantity_available: number;

  @ApiProperty()
  @IsNumber()
  readonly price: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly unit: string;

  @ApiProperty()
  @IsNumber()
  readonly unit_value: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly sell_user_id: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  readonly offer_price: number;

  @ApiProperty()
  @IsOptional()
  readonly image_url: string;

  @ApiProperty()
  @IsOptional()
  readonly date_created: Date;
}
