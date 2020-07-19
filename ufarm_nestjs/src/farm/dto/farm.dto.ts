import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDefined,
  IsNumber,
} from 'class-validator';

export class FarmDto {
  @ApiProperty()
  @IsOptional()
  readonly farm_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly scientific_name: string;

  @ApiProperty()
  @IsOptional()
  readonly cat_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  readonly how_to_farm: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  readonly image_url: string;

  @ApiProperty()
  @IsOptional()
  readonly date: Date;

  @ApiProperty()
  @IsOptional()
  readonly nutrition_fact_image_url: string;

  @ApiProperty()
  @IsNumber()
  readonly base_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  readonly unit: string;

  @ApiProperty()
  @IsOptional()
  readonly allowed_price_diff: number;
}
