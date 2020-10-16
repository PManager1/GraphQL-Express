let _ = require('lodash'); 
const graphql  = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLSchema
 } = graphql
// Dummy Data 


const Person = new GraphQLObjectType({
    name: 'Person', 
    description: 'Represents a person type', 
    fields: () =>({
        id: {type: GraphQLInt}, 
        name: {type: new GraphQLNonNull (GraphQLString)}, 
        age: {type: new GraphQLNonNull (GraphQLInt)},
        isMarried: {type: new GraphQLNonNull( GraphQLString)}, 
        gpa: {type: new GraphQLNonNull (GraphQLFloat)}, 
    })
})


// RootQuery 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', 
    description: 'RootQueryType for user...', 
    fields: {
        person: {
            type: Person, 
            resolve(parent, args){
                let personObj = {
                        name: 'Antonio', 
                        age: 23, 
                        isMarried: true, 
                        gpa: 5.0
                }
                return personObj; 
            }
        }

    }
});


// MUTATIONS 
// const Mutation = new GraphQLObjectType({
// })



module.exports = new GraphQLSchema({
    query: RootQuery, 

});