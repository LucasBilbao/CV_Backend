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
import { OrderType } from 'src/utils/order.enum';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dtos/createSkill.dto';
import { UpdateSkillDto } from './dtos/updateSkill.dto';

@Controller()
export class SkillController {
  constructor(private experienceService: SkillService) {}

  @Get()
  public async getAllSkills(
    @Query('sortBy')
    sortBy: string = 'level',
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
  public async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.experienceService.create<CreateSkillDto>(createSkillDto);
  }

  // @UseGuards(AuthGuard)
  @Post('multi')
  public async createMultiple(@Body() createSkillDtos: CreateSkillDto[]) {
    return await this.experienceService.createMultiple<CreateSkillDto>(
      createSkillDtos,
    );
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return await this.experienceService.update<UpdateSkillDto>(
      id,
      updateSkillDto,
    );
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.experienceService.remove(id);
  }
}
