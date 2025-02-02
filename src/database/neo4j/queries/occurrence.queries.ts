/**
 * Inserts multiple `Occurrence` nodes and associates them with a `Commitment` node.
 * 
 * The query:
 * 1. Unwinds the `$occurrences` array and processes each occurrence.
 * 2. Matches the `Commitment` node by its `commitment_id`.
 * 3. Creates an `Occurrence` node for each occurrence and sets its properties.
 * 4. Creates a relationship `INSTANCE_OF` between the `Occurrence` and `Commitment`.
 * 5. Returns the created `Occurrence` nodes with their properties, including a unique `_id` generated with `elementId(o)`.
 * 
 * Parameter:
 * - `$occurrences`: An array of occurrences to be inserted.
 */
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