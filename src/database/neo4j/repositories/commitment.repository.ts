import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class CommitmentRepository {
  constructor(@Inject('NEO4J_DRIVER') private readonly neo4jDriver: Driver) { }

  async insertOne() {
    const session = this.neo4jDriver.session();

    try {
      // Aqui vai a lógica de query
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }
}
