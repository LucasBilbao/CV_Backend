import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/createProject.dto';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {}

  public async create(createTagsDtos: CreateTagDto[]) {
    return Promise.all(
      createTagsDtos.map(async (tag) => {
        const existing = await this.tagRepo.findOneBy({
          name: tag.name,
        });

        if (existing) return existing;

        const newTag = this.tagRepo.create(tag);
        return await this.tagRepo.save(newTag);
      }),
    );
  }
}
