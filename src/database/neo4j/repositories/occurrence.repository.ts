import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

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
        const query = `
          UNWIND $occurrences AS occurrence
          MATCH (c:Commitment)
          WHERE elementId(c) = occurrence.commitment_id
          CREATE (o:Occurrence)
          SET o = occurrence
          WITH o, c
          CREATE (o)-[:INSTANCE_OF]->(c)
          RETURN o {
            .*,
            _id: elementId(o)
          }
        `;

        const response = await tx.run(query, { occurrences });
        return response.records.map(record => record.get('o'));
      });

      return result;
    } finally {
      await session.close();
    }
  }

  findAllByDateRange(arg0: { userId: string; startDate: string; endDate: string; }): Promise<Occurrence[]> {
    throw new Error('Method not implemented.');
  }

  findAllByMonth(arg0: { userId: string; month: number; year: number; }): Promise<Occurrence[]> {
    throw new Error('Method not implemented.');
  }
}
