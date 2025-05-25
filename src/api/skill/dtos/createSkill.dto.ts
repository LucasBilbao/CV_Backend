import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  skill: string;

  @IsNumber()
  @Max(4)
  @Min(0)
  @IsNotEmpty()
  level: number;
}
