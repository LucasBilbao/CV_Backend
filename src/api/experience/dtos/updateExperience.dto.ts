import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './createExperience.dto';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}
