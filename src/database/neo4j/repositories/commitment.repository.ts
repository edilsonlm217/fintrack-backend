import { Injectable, Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';

@Injectable()
export class CommitmentRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly neo4jDriver: Driver) { }

  async insertOne(userId: string, createCommitmentDto: CreateCommitmentDto): Promise<Commitment> {
    const session = this.neo4jDriver.session();

    try {
      const query = `
        MERGE (u:User { id: $userId })
        CREATE (c:Commitment $createCommitmentDto)
        CREATE (u)-[:HAS_COMMITMENT]->(c)
        RETURN c
      `;

      const result = await session.run(query, {
        userId: userId,
        createCommitmentDto: createCommitmentDto
      });

      return result.records[0]?.get('c').properties as Commitment;
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }
}
