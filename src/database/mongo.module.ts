import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { CommitmentRepository } from './repositories/commitment.repository';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient('mongodb+srv://edilsonlimaa:KkYWL4HUxSShKlDT@cluster0.u2kz1.mongodb.net/pluggy-app-database?retryWrites=true&w=majority&appName=Cluster0');
        await client.connect();
        return client.db();
      },
    },
    CommitmentRepository,
  ],
  exports: ['MONGO_CONNECTION', CommitmentRepository],
})
export class MongoModule { }
