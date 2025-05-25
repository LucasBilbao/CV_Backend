import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { ALIAS } from '../utils/alias.enum';

@Injectable()
export class SkillService extends BaseService<Skill> {
  constructor(@InjectRepository(Skill) skillRepo: Repository<Skill>) {
    super(skillRepo, ALIAS.SKILL);
  }
}
