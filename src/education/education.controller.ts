import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { OrderType } from 'src/utils/order.enum';
import { CreateEducationDto } from './dtos/createEducation.dto';
import { UpdateEducationDto } from './dtos/updateEducation.dto';

@Controller('api/educations')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get()
  public async getAllEducations(
    @Query('sortBy')
    sortBy: string = 'start',
    @Query('order')
    order: OrderType = OrderType.DESC,
  ) {
    return await this.educationService.index(sortBy, order);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.educationService.findOne(id);
  }

  @Post()
  public async create(@Body() createEducationDto: CreateEducationDto) {
    return await this.educationService.create(createEducationDto);
  }

  @Post('multi')
  public async createMultiple(
    @Body() createEducationDtos: CreateEducationDto[],
  ) {
    return await this.educationService.createMultiple(createEducationDtos);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return await this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.educationService.remove(id);
  }
}
