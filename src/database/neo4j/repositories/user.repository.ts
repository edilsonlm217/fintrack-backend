import { Inject, Injectable } from "@nestjs/common";
import { Driver } from "neo4j-driver";
import { User } from "src/common/interfaces/user.interface";

import { MERGE_USER } from "../queries/user.queries";

@Injectable()
export class UserRepository {
  constructor(
    @Inject('NEO4J_CONNECTION')
    private readonly neo4jDriver: Driver
  ) { }

  async createUserIfNotExists(user_id: string) {
    const session = this.neo4jDriver.session();

    try {
      const result = await session.executeWrite(async (tx) => {
        const response = await tx.run(MERGE_USER, { user_id });
        return response.records[0].get("u").properties as User;
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      await session.close();
    }
  }
}