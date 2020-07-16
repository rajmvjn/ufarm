import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsBoolean, IsOptional, IsDefined } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  readonly user_id: string;

  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsOptional()
  readonly pincode: number;

  @ApiProperty()
  @IsOptional()
  readonly avatar: string;

  @ApiProperty()
  @IsOptional()
  readonly date_created: Date;

  @ApiProperty()
  @IsBoolean()
  readonly sell: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly admin: boolean;
}
