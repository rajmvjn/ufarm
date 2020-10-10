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
  readonly description: string;

  @ApiProperty()
  readonly quantity_available: number;

  @ApiProperty()
  readonly unit: string;

  @ApiProperty()
  readonly sell_user_id: string;

  @ApiProperty()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  readonly offer_price_percentage: number;

  @ApiProperty()
  @IsOptional()
  image_url: string;

  @ApiProperty()
  @IsOptional()
  readonly date_created: Date;
}
