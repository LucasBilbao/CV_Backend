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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/createProject.dto';
import { UpdateProjectDto } from './dtos/updateProject.dto';

@Controller()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  public async getAllProjects(
    @Query('sortBy')
    sortBy: string = 'created_at',
    @Query('order')
    order: OrderType = OrderType.DESC,
  ) {
    return await this.projectService.index(sortBy, order, {
      table: 'tags',
      alias: 'tag',
    });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(id, ['tags']);
  }

  @Post()
  public async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create<CreateProjectDto>(createProjectDto);
  }

  // @UseGuards(AuthGuard)
  @Post('multi')
  public async createMultiple(@Body() createProjectDtos: CreateProjectDto[]) {
    return await this.projectService.createMultiple<CreateProjectDto>(
      createProjectDtos,
    );
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update<UpdateProjectDto>(
      id,
      updateProjectDto,
    );
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.projectService.remove(id);
  }
}
