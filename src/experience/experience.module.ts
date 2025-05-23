import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

@Module({
  providers: [ExperienceService],
  controllers: [ExperienceController]
})
export class ExperienceModule {}
