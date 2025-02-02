import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { INSERT_MANY_OCCURRENCES } from '../queries/occurrence.queries';

@Injectable()
export class OccurrenceRepository {
  constructor(
    @Inject('NEO4J_CONNECTION')
    private readonly neo4jDriver: Driver,
  ) { }

  async insertMany(occurrences: CreateOccurrenceDto[]): Promise<Occurrence[]> {
    const session = this.neo4jDriver.session();

    try {
      const result = await session.executeWrite(async (tx) => {
        const response = await tx.run(INSERT_MANY_OCCURRENCES, { occurrences });
        return response.records.map(record => record.get('o').properties);
      });

      return result;
    } finally {
      await session.close();
    }
  }

  async findAllByDateRange(arg0: { userId: string; startDate: string; endDate: string; }): Promise<Occurrence[]> {
    const session = this.neo4jDriver.session();

    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }

  async findAllByMonth(arg0: { userId: string; month: number; year: number; }): Promise<Occurrence[]> {
    const session = this.neo4jDriver.session();

    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }
}
