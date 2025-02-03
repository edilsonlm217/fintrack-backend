const MERGE_USER = `
  MERGE (u:User {user_id: $user_id})
  RETURN u
`;