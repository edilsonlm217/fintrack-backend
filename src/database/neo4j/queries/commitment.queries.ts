export const CREATE_COMMITMENT = `
  CREATE (c:Commitment)
  SET c = $props
  RETURN c { .* , _id: elementId(c) }
`;