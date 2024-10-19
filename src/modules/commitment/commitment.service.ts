import { Injectable } from '@nestjs/common';
import { CreateService } from './submodules/create/create.service';
import { CreateCommitmentDto } from '../../common/dto/create-commitment.dto';

@Injectable()
export class CommitmentService {
  constructor(
    private readonly createService: CreateService,
  ) { }

  async create(createCommitmentDto: CreateCommitmentDto) {
    return this.createService.process(createCommitmentDto);
  }
}
