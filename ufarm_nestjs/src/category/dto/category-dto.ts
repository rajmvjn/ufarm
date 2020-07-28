import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsOptional()
  readonly cat_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly status: string;

  @ApiProperty()
  @IsOptional()
  img_url: string;

  @ApiProperty()
  @IsOptional()
  readonly description: string;
}
