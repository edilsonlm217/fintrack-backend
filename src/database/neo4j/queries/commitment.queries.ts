/**
 * Creates a `Commitment` node in the Neo4j database with the provided properties.
 * 
 * The query:
 * 1. Creates the `Commitment` node with properties defined in `$props`.
 * 2. Returns the created node with all its properties, including a unique `_id` generated with `elementId(c)`.
 * 
 * Parameter:
 * - `$props`: The properties of the commitment (value, date, category, etc.).
 */
export const CREATE_COMMITMENT = `
  CREATE (c:Commitment)
  SET c = $props
  RETURN c { .* , _id: elementId(c) }
`;