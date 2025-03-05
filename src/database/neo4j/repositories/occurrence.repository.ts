import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';

@Injectable()
export class OccurrenceRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly neo4jDriver: Driver) { }

  async insertMany(commitmentId: string, createOccurrenceDto: CreateOccurrenceDto[]): Promise<Occurrence[]> {
    const session = this.neo4jDriver.session();

    try {
      const query = `
        UNWIND $createOccurrenceDto AS doc
        MATCH (c:Commitment { id: $commitmentId })
        CREATE (o:Occurrence)
        SET o += doc
        CREATE (c)-[:HAS_OCCURRENCE]->(o)
        RETURN o
      `;

      const result = await session.run(query, { createOccurrenceDto, commitmentId });

      return result.records.map(record => record.get('o').properties) as Occurrence[];
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }
}