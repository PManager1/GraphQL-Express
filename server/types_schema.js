let _ = require('lodash'); 
const graphql  = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
 } = graphql
// Dummy Data 




// RootQuery 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    description: 'RootQueryType for user...', 
});

// MUTATIONS 
// const Mutation = new GraphQLObjectType({
// })



module.exports = new GraphQLSchema({
    query: RootQuery, 

});