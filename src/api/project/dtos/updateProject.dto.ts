import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto, CreateTagDto } from './createProject.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class UpdateTagDto extends PartialType(CreateTagDto) {}
