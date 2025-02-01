import { Injectable, Inject } from '@nestjs/common';
import { Db, Collection, ObjectId } from 'mongodb';
import { Commitment } from 'src/common/interfaces/commitment.interface';
import { CreateCommitmentDto } from 'src/common/dto/create-commitment.dto';

@Injectable()
export class CommitmentRepository {
  private readonly collection: Collection;

  constructor(
    @Inject('MONGO_CONNECTION') private readonly db: Db,
  ) {
    this.collection = this.db.collection('financial-commitments');
  }

  async findAll() {
    return this.collection.find().toArray();
  }

  async findOne(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async insertOne(document: Partial<CreateCommitmentDto>): Promise<Commitment> {
    const result = await this.collection.insertOne(document);

    if (result.acknowledged) {
      return { _id: result.insertedId.toString(), ...document } as Commitment;
    }
  }

  async updateOne(id: string, document: any) {
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: document });
  }

  async deleteOne(id: string) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async findByIds(ids: string[]): Promise<Commitment[]> {
    // Converte os IDs para ObjectId, pois o MongoDB utiliza esse formato
    const objectIds = ids.map((id) => new ObjectId(id));
    
    // Busca todos os commitments que possuem _id dentro da lista de objectIds
    return this.collection.find<Commitment>({ _id: { $in: objectIds } }).toArray();
  }
}
