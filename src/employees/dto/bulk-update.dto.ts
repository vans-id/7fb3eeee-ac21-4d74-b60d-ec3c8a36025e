import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class BulkUpdateDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}