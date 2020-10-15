const graphql  = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
 } = graphql


// Create types
const userType = new GraphQLObjectType({
    name: 'User', 
    description: 'Documentation for user...', 
    fields: () =>({
        id: {type: GraphQLID}, 
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
            type: userType, 
            args: {}, 
        }
        
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
});