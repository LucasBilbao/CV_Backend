import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationDto } from './createEducation.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}
