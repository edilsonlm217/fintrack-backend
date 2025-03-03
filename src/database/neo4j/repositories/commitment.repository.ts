import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';

@Injectable()
export class CommitmentRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly neo4jDriver: Driver) { }

  async insertOne(createCommitmentDto: Partial<CreateCommitmentDto>): Promise<Commitment> {
    const session = this.neo4jDriver.session();

    try {
      const { user_id, ...commitmentData } = createCommitmentDto;
      const commitmentId = uuidv4();

      // Adiciona o ID ao próprio documento
      const commitmentWithId = {
        _id: commitmentId,
        ...commitmentData,
      };

      const query = `
        MERGE (u:User { id: $userId })
        CREATE (c:Commitment $commitmentWithId)
        CREATE (u)-[:HAS_COMMITMENT]->(c)
        RETURN c
      `;

      const result = await session.run(query, {
        userId: user_id,
        commitmentWithId,
      });

      const commitmentNode = result.records[0]?.get('c').properties;

      return commitmentNode as Commitment;
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }
}
