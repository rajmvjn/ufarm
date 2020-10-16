import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly status: string;

  @ApiProperty()
  @IsOptional()
  image_url: string;

  @ApiProperty()
  @IsOptional()
  date_created: any;

  @ApiProperty()
  @IsOptional()
  date_updated: any;

  @ApiProperty()
  @IsOptional()
  readonly description: string;
}
