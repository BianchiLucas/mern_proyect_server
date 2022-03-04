const User = require("../controllers/user.controllers")

const resolver = {
    // Data Base
    Query: {
        getUser: () => {
            console.log("Returning User");
            return null; 
        }
    },
    // Sección para usuarios
    Mutation: {
        newUser: (_, { input }) => {
            User.newUser(input)
        },
        authentication: (_, { input }) => {
            User.authentication(input)
        }
    }
}

module.exports = resolver; 