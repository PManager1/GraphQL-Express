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
    {id: '1', name: 'Bond', age: 23, profession: "teacher" },
    {id: '2', name: 'James', age: 23, profession: "beggar" },
    {id: '3', name: 'Ahmed', age: 34 , profession: "whore"},
    {id: '4', name: 'Jay', age: 83 ,profession: "real estate"},
    {id: '5', name: 'Jo', age: 23 ,profession: "Builder"},
];
var hobbyData = [
    {id: '1', title: 'Basket Ball', description: 'the description' },
    {id: '2', title: 'FoodBall',  description: 'the description' },
    {id: '3', title: 'Soccer',  description: 'the description' },
    {id: '4', title: 'Badminton',  description: 'the description' },
    {id: '5', title: 'Skates',  description: 'the description' },
];



var postData = [
    {id: '1', comment: 'First comment Ball' },
    {id: '2', comment: 'second comment'   },
    {id: '3', comment: 'Third comment'  },
    {id: '4', comment: 'Forth Comment' },
];



// Create types
const UserType = new GraphQLObjectType({
    name: 'User', 
    description: 'Documentation for user...', 
    fields: () =>({
        id: {type: GraphQLString}, 
        name: {type: GraphQLString}, 
        age: {type: GraphQLInt}, 
        profession: {type: GraphQLString}
    })
});

// Create HobbyType types
const HobbyType = new GraphQLObjectType({
    name: 'Hobby', 
    description: 'Documentation for Hobby...', 
    fields: () =>({
        id: {type: GraphQLString}, 
        title: {type: GraphQLString}, 
        description: {type: GraphQLString}
    })
});

// Create Post types
const PostType = new GraphQLObjectType({
    name: 'Post', 
    description: 'Post Documentation...', 
    fields: () =>({
        id: {type: GraphQLString}, 
        comment: {type: GraphQLString}
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
                // we resolve get and 
                //return data from data source. 
            }
        },
        hobby: { 
            type: HobbyType, 
            args: {id: {type: GraphQLString}}, 

            resolve(parent, args){
               return _.find(hobbyData, {
                 id: args.id  
               })
                // we resolve get and 
                //return data from data source. 
            }
        },
        post: { 
            type: PostType, 
            args: {id: {type: GraphQLString}}, 

            resolve(parent, args){
               return _.find(postData, {
                 id: args.id  
               })
                // we resolve get and 
                //return data from data source. 
            }
        }                  
        
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});