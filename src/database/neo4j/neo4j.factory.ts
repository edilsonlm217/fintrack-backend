import * as neo4j from 'neo4j-driver';
import { ConfigService } from '@nestjs/config';
import { getNeo4jConfig } from './neo4j.config';

export const createNeo4jDriver = async (configService: ConfigService): Promise<neo4j.Driver> => {
  const { uri, username, password } = getNeo4jConfig(configService);
  const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

  const session = driver.session();

  try {
    // Trying a simple test query
    await session.run('MATCH (n) RETURN n LIMIT 1');
  } catch (error) {
    throw new Error(`Error connecting to Neo4j: ${error.message}`);
  } finally {
    await session.close();
  }

  return driver;
};
