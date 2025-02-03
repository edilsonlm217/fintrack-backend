import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/neo4j/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async createUserIfNotExists(user_id: string) {
    return this.userRepository.createUserIfNotExists(user_id);
  }
}
