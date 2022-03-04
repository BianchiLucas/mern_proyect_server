const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID, 
        userName: String,
        name: String,
        email: String,
        avatar: String,
        website: String,
        description: String,
        password: String
    }

    type Token {
        token:String
    }

    input UserInput {
        name: String!,
        userName: String!,
        email: String!,
        password: String!
    }

    input LoginInput {
        email:String!,
        password:String!
    }

    type Query {
        getUser: User
    }

    type Mutation {
        newUser(input: UserInput): User
        authentication(input: LoginInput): Token
    }
`;

module.exports = typeDefs;
