import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommitmentFilter } from './commitment-filter.input';
import { OccurrenceFilter } from './occurrence-filter.input';
import { CommitmentModel } from './commitment.model';
import { Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Resolver(() => CommitmentModel)
export class CommitmentResolver {
  constructor(@Inject('NEO4J_DRIVER') private readonly neo4jDriver: Driver) { }

  @Query(() => [CommitmentModel])
  async getCommitmentsByUser(
    @Args('userId') userId: string,
    @Args('commitmentFilter', { nullable: true }) commitmentFilter?: CommitmentFilter,
    @Args('occurrenceFilter', { nullable: true }) occurrenceFilter?: OccurrenceFilter,
  ): Promise<CommitmentModel[]> {
    const params: any = { userId };
    let query = `
      MATCH (u:User)-[:HAS_COMMITMENT]->(c:Commitment)
      WHERE u.id = $userId
    `;

    // Filtros de Commitment
    if (commitmentFilter?.type) {
      query += ` AND c.type = $type`;
      params.type = commitmentFilter.type;
    }
    if (commitmentFilter?.description) {
      query += ` AND c.description CONTAINS $description`;
      params.description = commitmentFilter.description;
    }
    if (commitmentFilter?.amount) {
      query += ` AND c.amount = $amount`;
      params.amount = commitmentFilter.amount;
    }
    if (commitmentFilter?.periodicity) {
      query += ` AND c.periodicity = $periodicity`;
      params.periodicity = commitmentFilter.periodicity;
    }
    if (commitmentFilter?.category) {
      query += ` AND c.category = $category`;
      params.category = commitmentFilter.category;
    }
    if (commitmentFilter?.subcategory) {
      query += ` AND c.subcategory = $subcategory`;
      params.subcategory = commitmentFilter.subcategory;
    }

    // Buscar as ocorrências com filtros
    query += `
      OPTIONAL MATCH (c)-[:HAS_OCCURRENCE]->(o:Occurrence)
      WHERE 1=1
    `;

    // Filtros de Occurrence
    if (occurrenceFilter?.status) {
      query += ` AND o.status = $status`;
      params.status = occurrenceFilter.status;
    }
    if (occurrenceFilter?.due_date_range?.start && occurrenceFilter?.due_date_range?.end) {
      query += ` AND o.due_date >= $due_date_start AND o.due_date <= $due_date_end`;
      params.due_date_start = occurrenceFilter.due_date_range.start;
      params.due_date_end = occurrenceFilter.due_date_range.end;
    }

    // Agregar ocorrências e filtrar compromissos sem ocorrências
    query += `
      WITH c, COLLECT(o) AS occurrences
      WHERE SIZE(occurrences) > 0
      RETURN c, occurrences
    `;

    // Executar a query no Neo4j
    const session = this.neo4jDriver.session();
    const result = await session.run(query, params);

    // Transformar os resultados para os objetos GraphQL
    return result.records.map((record) => ({
      ...record.get('c').properties,
      occurrences: record.get('occurrences').map((occ) => occ.properties),
    }));
  }
}
