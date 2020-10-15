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
var userData = [
    {id: '1', name: '1-Bond', age: 23, profession: "teacher" },
    {id: '2', name: '2-James', age: 23, profession: "beggar" },
    {id: '3', name: '3-Ahmed', age: 34 , profession: "whore"},
    {id: '4', name: '4-Jay', age: 83 ,profession: "real estate"},
    {id: '5', name: '5-Jo', age: 23 ,profession: "Builder"},
];
var hobbyData = [
    {id: '1', title: 'Basket Ball', description: 'the description' , userId: '1' },
    {id: '2', title: 'FoodBall',  description: 'the description', userId: '2' },
    {id: '3', title: 'Soccer',  description: 'the description' , userId: '3' },
    {id: '4', title: 'Badminton',  description: 'the description' , userId: '4' },
    {id: '5', title: 'Skates',  description: 'the description' , userId: '5' },
];

var postData = [
    {id: '1', comment: 'First comment Ball', userId: '1' },
    {id: '2', comment: 'second comment', userId: '1'   },
    {id: '3', comment: 'Third comment' , userId: '3' },
    {id: '4', comment: 'Forth Comment' , userId: '1'},
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
        description: {type: GraphQLString}, 
        user: {
            type: UserType, 
            resolve(parent, args){
                return _.find(userData, { id: parent.userId})
            }
        }
    })
});

// Create Post types
const PostType = new GraphQLObjectType({
    name: 'Post', 
    description: 'Post Documentation...', 
    fields: () =>({
        id: {type: GraphQLString}, 
        comment: {type: GraphQLString}, 
        user: {
            type: UserType, 
            resolve(parent, args){
                return _.find(userData, { id: parent.userId})
            }
        }
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
               return _.find(userData, {
                 id: args.id  
               })
                
            }
        },
        hobby: { 
            type: HobbyType, 
            args: {id: {type: GraphQLString}}, 

            resolve(parent, args){
               return _.find(hobbyData, {
                 id: args.id  
               })
 
            }
        },
        post: { 
            type: PostType, 
            args: {id: {type: GraphQLString}}, 

            resolve(parent, args){
               return _.find(postData, {
                 id: args.id  
               })
         
            }
        }                  
        
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});