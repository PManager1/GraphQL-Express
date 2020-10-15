const graphql  = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
 } = graphql


// Create types
const UserType = new GraphQLObjectType({
    name: 'User', 
    description: 'Documentation for user...', 
    fields: () =>({
        id: {type: GraphQLString}, 
        name: {type: GraphQLString}, 
        age: {type: GraphQLInt}, 
    })
});

// RootQuery 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    description: 'RootQueryType for user...', 
    fields: {
        user: { 
            type: UserType, 
            args: {id: {type: GraphQLString}}, 

            resolve(parent, args){
                let user = {
                    id: "123",
                    age: 32,  
                    name: "Paul",
                }
                return user;
                // we resolve get and 
                //return data from data source. 
            }
        }
        
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});