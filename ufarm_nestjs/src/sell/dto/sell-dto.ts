import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional, IsDefined, IsNotEmpty } from 'class-validator';

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
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  readonly quantity_available: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly unit: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
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
  date_created: any;

  @ApiProperty()
  @IsOptional()
  date_updated: any;
}
