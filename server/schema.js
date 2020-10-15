let _ = require('lodash'); 

const graphql  = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
 } = graphql
// Dummy Data 
var usersData = [
    {id: '1', name: 'Bond', age: 23 },
    {id: '2', name: 'James', age: 23 },
    {id: '3', name: 'Ahmed', age: 34 },
    {id: '4', name: 'Jay', age: 83 },
    {id: '5', name: 'Jo', age: 23 },
]



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
               return _.find(usersData, {
                 id: args.id  
               })
                // return user;
                // we resolve get and 
                //return data from data source. 
            }
        }
        
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});