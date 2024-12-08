import { Injectable, Inject } from '@nestjs/common';
import { Db, Collection, ObjectId } from 'mongodb';
import { Occurrence } from 'src/common/interfaces/occurrence.interface';
import { CreateOccurrenceDto } from 'src/common/dto/create-occurrence.dto';

interface FindByDateRangeParams {
  userId: string;
  month: number;
  year: number;
}

@Injectable()
export class OccurrenceRepository {
  private readonly collection: Collection;

  constructor(
    @Inject('MONGO_CONNECTION') private readonly db: Db,
  ) {
    this.collection = this.db.collection('financial-occurrences');
  }

  async findByDateRange(params: FindByDateRangeParams) {
    return this.collection.find<Occurrence>({
      user_id: params.userId,
      $expr: {
        $and: [
          { $eq: [{ $month: { $dateFromString: { dateString: "$due_date" } } }, params.month] },
          { $eq: [{ $year: { $dateFromString: { dateString: "$due_date" } } }, params.year] },
        ],
      },
    }).toArray();
  }

  async findOne(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async insertOne(document: Partial<CreateOccurrenceDto>): Promise<Occurrence> {
    const result = await this.collection.insertOne(document);

    if (result.acknowledged) {
      return { _id: result.insertedId.toString(), ...document } as Occurrence;
    }
  }

  async insertMany(documents: Partial<CreateOccurrenceDto>[]): Promise<Occurrence[]> {
    const result = await this.collection.insertMany(documents);

    // Use insertedIds para mapear os documentos
    return Object.keys(result.insertedIds).map((key) => {
      const id = result.insertedIds[key];
      return { _id: id.toString(), ...documents[+key] } as Occurrence; // +key converte para número
    });
  }

  async updateOne(id: string, document: any) {
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: document });
  }

  async deleteOne(id: string) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async findByCommitmentId(commitmentId: string) {
    return this.collection.find({ commitment_id: commitmentId }).toArray();
  }
}
