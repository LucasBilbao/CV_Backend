import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @MinLength(3)
  @IsString()
  @IsOptional()
  level: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  specialty: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  school: string;

  @IsNotEmpty()
  @IsDate()
  start: Date;

  @IsDate()
  @IsOptional()
  end: Date;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
