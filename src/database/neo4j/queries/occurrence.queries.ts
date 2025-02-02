export const INSERT_MANY_OCCURRENCES = `
  UNWIND $occurrences AS occurrence
  MATCH (c:Commitment)
  WHERE elementId(c) = occurrence.commitment_id
  CREATE (o:Occurrence)
  SET o = occurrence
  WITH o, c
  CREATE (o)-[:INSTANCE_OF]->(c)
  RETURN o { .* , _id: elementId(o) }
`;