import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';

import { CREATE_COMMITMENT } from '../queries/commitment.queries';

@Injectable()
export class CommitmentRepository {
  constructor(
    @Inject('NEO4J_CONNECTION')
    private readonly neo4jDriver: Driver,
  ) { }

  async insertOne(commitment: Partial<CreateCommitmentDto>) {
    const session = this.neo4jDriver.session();
    try {
      const result = await session.executeWrite(tx => tx.run(CREATE_COMMITMENT, {
        props: commitment
      }));
      return result.records[0].get('c') as Commitment;
    } finally {
      await session.close();
    }
  }

  async findByIds(commitmentIds: string[]): Promise<Commitment[]> {
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
