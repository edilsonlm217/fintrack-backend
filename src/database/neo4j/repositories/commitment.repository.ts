import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';
import { Commitment } from 'src/common/interfaces/commitment.interface';

@Injectable()
export class CommitmentRepository {
  constructor(
    @Inject('NEO4J_CONNECTION')
    private readonly neo4jDriver: Driver,
  ) { }

  async insertOne(commitment: Partial<CreateCommitmentDto>) {
    const session = this.neo4jDriver.session();
    const result = await session.executeWrite(tx => tx.run(`
      CREATE (c:Commitment)
      SET c = $props
      RETURN c {
        .*,
        _id: elementId(c)
      }
    `, {
      props: commitment
    }));

    return result.records[0].get('c') as Commitment;
  }

  findByIds(commitmentIds: string[]): Promise<Commitment[]> {
    throw new Error('Method not implemented.');
  }
}
