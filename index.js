require("dotenv").config()
const mongoose = require("mongoose")
const { ApolloServer, gql } = require("apollo-server")
const resolver = require("./gpl/resolver")
const typeDefs = require("./gpl/typeDefs")

const serverApollo = new ApolloServer({ typeDefs, resolver })

try {
    ( async () => {
        await mongoose.connect(process.env.MONGO_ATLAS), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        }
        const response = await serverApollo.listen()
        console.log(`Server running in: ${response.url}`)
    })();

} catch (error) {
    console.error(error.message);
}

