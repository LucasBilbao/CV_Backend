import { Module } from '@nestjs/common';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EducationModule } from './api/education/education.module';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { ExperienceModule } from './api/experience/experience.module';
import { ProjectModule } from './api/project/project.module';
import { SkillModule } from './api/skill/skill.module';

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
    UserModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'educations',
            module: EducationModule,
          },
          {
            path: 'experiences',
            module: ExperienceModule,
          },
          {
            path: 'projects',
            module: ProjectModule,
          },
          {
            path: 'skills',
            module: SkillModule,
          },
        ],
      },
    ]),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
