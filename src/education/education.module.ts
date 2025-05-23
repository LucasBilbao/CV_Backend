import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  providers: [EducationService],
  controllers: [EducationController],
})
export class EducationModule {}
