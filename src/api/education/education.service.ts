import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { BaseService } from '../base/base.service';
import { ALIAS } from '../utils/alias.enum';

@Injectable()
export class EducationService extends BaseService<Education> {
  constructor(
    @InjectRepository(Education)
    educationRepo: Repository<Education>,
  ) {
    super(educationRepo, ALIAS.EDUCATION);
  }
}
