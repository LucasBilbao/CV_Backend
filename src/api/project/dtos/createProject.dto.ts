import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(3)
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  deploymentUrl: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  repositoryUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags: CreateTagDto[];
}

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
