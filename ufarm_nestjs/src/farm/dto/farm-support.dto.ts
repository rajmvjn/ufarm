import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDefined,
} from 'class-validator';

export class FarmSupportDto {
  @ApiProperty()
  @IsOptional()
  readonly farm_suprt_id: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty()
  @IsOptional()
  readonly image_url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  readonly admin_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  readonly name: string;
}
