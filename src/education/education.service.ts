import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { QueryBuilderFacade } from 'src/utils/queryBuilder.facade';
import { OrderType } from 'src/utils/order.enum';
import { CreateEducationDto } from './dtos/createEducation.dto';
import { UpdateEducationDto } from './dtos/updateEducation.dto';

@Injectable()
export class EducationService {
  private readonly ALIAS = 'education';

  constructor(
    @InjectRepository(Education)
    private educationRepo: Repository<Education>,
  ) {}

  public async index(sortBy: string, order: OrderType) {
    const [educations, total] = await new QueryBuilderFacade<Education>(
      this.educationRepo.createQueryBuilder('education'),
    )
      .orderBy(`education.${sortBy}`, order)
      .get();

    return {
      educations,
      total,
    };
  }

  public async create(
    createEducationDto: CreateEducationDto,
  ): Promise<Education> {
    const education = this.educationRepo.create({ ...createEducationDto });

    return this.educationRepo.save(education);
  }

  public async createMultiple(
    createEducationDtos: CreateEducationDto[],
  ): Promise<Education[]> {
    return Promise.all(
      createEducationDtos.map((createEducationDto) =>
        this.create(createEducationDto),
      ),
    );
  }

  public async findOne(id: string): Promise<Education | { education: null }> {
    const education = await this.educationRepo.findOne({
      where: { id },
    });

    if (!education) {
      return { education: null };
    }

    return { ...education };
  }

  public update(id: string, updateEducationDto: UpdateEducationDto) {
    return this.educationRepo.update(id, { ...updateEducationDto });
  }

  public remove(id: string) {
    return this.educationRepo.delete(id);
  }
}
