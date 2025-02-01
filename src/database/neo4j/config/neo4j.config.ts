import { Neo4jConfig } from './interfaces/neo4j-config.interface';
import neo4j from 'neo4j-driver';

export const neo4jConfig: Neo4jConfig = {
  url: 'neo4j+s://ab5a4c6a.databases.neo4j.io',
  username: 'neo4j',
  password: 'SvG65w9wC1KpgkW1UlZMdbyV30qeXIoWI2qDdS6zvcw'
};

export const createNeo4jConnection = async () => {
  try {
    const driver = neo4j.driver(
      neo4jConfig.url,
      neo4j.auth.basic(neo4jConfig.username, neo4jConfig.password)
    );

    await driver.getServerInfo();
    return driver;
  } catch (error) {
    throw new Error('Failed to establish connection with Neo4j. Shutting down application.');
  }
};