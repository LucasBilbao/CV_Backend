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
import { ExperienceService } from './experience.service';
import { OrderType } from 'src/utils/order.enum';
import { CreateExperienceDto } from './dtos/createExperience.dto';
import { UpdateExperienceDto } from './dtos/updateExperience.dto';

@Controller()
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @Get()
  public async getAllExperiences(
    @Query('sortBy')
    sortBy: string = 'start',
    @Query('order')
    order: OrderType = OrderType.DESC,
  ) {
    return await this.experienceService.index(sortBy, order);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.experienceService.findOne(id);
  }

  @Post()
  public async create(@Body() createExperienceDto: CreateExperienceDto) {
    return await this.experienceService.create<CreateExperienceDto>(
      createExperienceDto,
    );
  }

  // @UseGuards(AuthGuard)
  @Post('multi')
  public async createMultiple(
    @Body() createExperienceDtos: CreateExperienceDto[],
  ) {
    return await this.experienceService.createMultiple<CreateExperienceDto>(
      createExperienceDtos,
    );
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return await this.experienceService.update<UpdateExperienceDto>(
      id,
      updateExperienceDto,
    );
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.experienceService.remove(id);
  }
}
