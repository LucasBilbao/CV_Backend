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

@Controller()
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

  // @UseGuards(AuthGuard)
  @Post()
  public async create(@Body() createEducationDto: CreateEducationDto) {
    return await this.educationService.create<CreateEducationDto>(
      createEducationDto,
    );
  }

  // @UseGuards(AuthGuard)
  @Post('multi')
  public async createMultiple(
    @Body() createEducationDtos: CreateEducationDto[],
  ) {
    return await this.educationService.createMultiple<CreateEducationDto>(
      createEducationDtos,
    );
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return await this.educationService.update<UpdateEducationDto>(
      id,
      updateEducationDto,
    );
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.educationService.remove(id);
  }
}
