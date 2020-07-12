import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SellerRequestDto {
  @ApiProperty()
  @IsOptional()
  readonly rq_id: string;

  @ApiProperty()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly req_user_id: string;
}
