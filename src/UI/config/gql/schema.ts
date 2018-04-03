const Schema: string = `
    type Query { 
        user(uuid: String!): User 
    }
    type User { 
        uuid: String, 
        email: String 
    }
    type Mutation {
      
      createUser(uuid: String!, email: String!): String
    }
`;


export default Schema;