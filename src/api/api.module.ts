import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [EducationModule, ExperienceModule, ProjectModule, SkillModule],
  controllers: [ApiController],
})
export class ApiModule {}
