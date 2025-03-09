import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommitmentResolver } from './commitment.resolver';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Gera o schema automaticamente
    }),
  ],
  providers: [CommitmentResolver],
})
export class GraphqlModule { }
