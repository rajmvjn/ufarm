import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsOptional()
  readonly cat_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  readonly img_url: string;
}
