import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PayloadDataDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  id: number;

  @IsBoolean()
  role: string;
}
