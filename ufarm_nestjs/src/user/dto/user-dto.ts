import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  readonly id: string;

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
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  readonly pincode: number;

  @ApiProperty()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  date_created: any;

  @ApiProperty()
  @IsOptional()
  date_updated: any;

  @ApiProperty()
  readonly sell?: boolean;

  @ApiProperty()
  readonly admin?: boolean;
}

export class AuthUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
