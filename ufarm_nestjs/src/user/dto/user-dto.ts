import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  readonly user_id: string;

  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  readonly phone?: number;

  @ApiProperty()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsOptional()
  readonly housename: string;

  @ApiProperty()
  @IsOptional()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly pincode: number;

  @ApiProperty()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  readonly date_created: Date;

  @ApiProperty()
  readonly sell?: boolean;

  @ApiProperty()
  readonly admin?: boolean;
}
