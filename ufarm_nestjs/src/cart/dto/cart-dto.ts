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
  @IsNumber()
  readonly quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly item_id: string;

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
  date_created: any;

  @ApiProperty()
  @IsOptional()
  date_updated: any;
}
