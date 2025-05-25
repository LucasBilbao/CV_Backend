import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ALIAS } from '../utils/alias.enum';
import { CreateTagDto } from './dtos/createProject.dto';
import { TagService } from './service/tag.service';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    private tagService: TagService,
  ) {
    super(projectRepo, ALIAS.PROJECT);
  }

  public async create<D extends DeepPartial<Project>>(
    createDto: D,
  ): Promise<Project> {
    if (!createDto) {
      throw new Error('Passed ');
    }

    const { title, description, deploymentUrl, repositoryUrl } = createDto;
    const project = this.projectRepo.create({
      title,
      description,
      deploymentUrl,
      repositoryUrl,
    });

    project.tags = await this.tagService.create(
      createDto.tags as CreateTagDto[],
    );

    return this.projectRepo.save(project);
  }
}
