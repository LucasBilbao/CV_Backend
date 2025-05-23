import { Module } from '@nestjs/common';
import { SkillModule } from './skill/skill.module';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationModule } from './education/education.module';
import { ProjectModule } from './project/project.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SkillModule,
    EducationModule,
    ProjectModule,
    ExperienceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
