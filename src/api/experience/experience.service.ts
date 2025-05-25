import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { ALIAS } from '../utils/alias.enum';

@Injectable()
export class ExperienceService extends BaseService<Experience> {
  constructor(
    @InjectRepository(Experience)
    readonly experienceRepo: Repository<Experience>,
  ) {
    super(experienceRepo, ALIAS.EXPERIENCE);
  }
}
