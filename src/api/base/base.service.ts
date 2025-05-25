import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { ALIAS } from '../utils/alias.enum';
import { OrderType } from 'src/utils/order.enum';
import { QueryBuilderFacade } from 'src/utils/queryBuilder.facade';
import { Relation } from './interfaces/relations.interface';
import plural from 'plural';

export class BaseService<T extends ObjectLiteral> {
  protected readonly ALIAS: ALIAS;

  constructor(
    private readonly repository: Repository<T>,
    alias: ALIAS,
  ) {
    this.ALIAS = alias;
  }

  public async index(sortBy: string, order: OrderType, relation?: Relation) {
    const queryBuilderFacade = new QueryBuilderFacade<T>(
      this.repository.createQueryBuilder(this.ALIAS),
    ).orderBy(`${this.ALIAS}.${sortBy}`, order);

    if (relation) {
      queryBuilderFacade.leftJoinAndSelect(
        `${this.ALIAS}.${relation.table}`,
        relation.alias,
      );
    }

    const [data, total] = await queryBuilderFacade.get();
    return {
      [plural(this.ALIAS)]: data,
      total,
    };
  }

  public async create<D extends DeepPartial<T>>(createDto: D): Promise<T> {
    const data = this.repository.create({ ...createDto });

    return this.repository.save(data);
  }

  public async createMultiple<D extends DeepPartial<T>>(
    createDtos: D[],
  ): Promise<T[]> {
    return Promise.all(createDtos.map((dto) => this.create<D>(dto)));
  }

  public async findOne(
    id: string,
    relations: string[] = [],
  ): Promise<T | { education: null }> {
    const options: unknown = { id };
    const where = options as
      | FindOptionsWhere<T>
      | FindOptionsWhere<T>[]
      | undefined;
    const education = await this.repository.findOne({
      where,
      relations,
    });

    if (!education) {
      return { education: null };
    }

    return { ...education };
  }

  public update<D extends ObjectLiteral>(id: string, updateDto: D) {
    return this.repository.update(id, { ...updateDto });
  }

  public remove(id: string) {
    return this.repository.delete(id);
  }
}
