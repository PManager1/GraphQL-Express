const graphql  = require('graphql');
let _ = require('lodash'); 
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
 } = graphql

const User = require('../model/user'); 
const Hobby = require('../model/hobby'); 
const Post = require('../model/post'); 


// Dummy Data 
// var userData = [
//     {id: '1', name: '1-Bond', age: 23, profession: "teacher" },
//     {id: '2', name: '2-James', age: 23, profession: "beggar" },
//     {id: '3', name: '3-Ahmed', age: 34 , profession: "whore"},
//     {id: '4', name: '4-Jay', age: 83 ,profession: "real estate"},
//     {id: '5', name: '5-Jo', age: 23 ,profession: "Builder"},
// ];
// var hobbyData = [
//     {id: '1', title: 'Basket Ball', description: 'the description' , userId: '1' },
//     {id: '2', title: 'FoodBall',  description: 'the description', userId: '2' },
//     {id: '3', title: 'Soccer',  description: 'the description' , userId: '3' },
//     {id: '4', title: 'Badminton',  description: 'the description' , userId: '4' },
//     {id: '5', title: 'Skates',  description: 'the description' , userId: '5' },
// ];

// var postData = [
//     {id: '1', comment: 'First comment Ball', userId: '1' },
//     {id: '2', comment: 'second comment', userId: '1'   },
//     {id: '3', comment: 'Third comment' , userId: '2' },
//     {id: '4', comment: 'Forth Comment' , userId: '1'},
// ];


// Create types
const UserType = new GraphQLObjectType({
    name: 'User', 
    description: 'Documentation for user...', 
    fields: () =>({
        id: {type: GraphQLString}, 
        name: {type: GraphQLString}, 
        age: {type: GraphQLInt}, 
        profession: {type: GraphQLString}, 

        posts: {  type: new GraphQLList(UserType), 
            resolve(parent, args){
               return Post.find({ });
            }
            },

        hobbies: {  type: new GraphQLList(UserType), 
                resolve(parent, args){
                return Hobby.find({ });
                }
            },

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
                //return _.find(userData, { id: parent.userId})
                return User.findById(parent.userId)
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
                return User.findById(parent.userId)
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
               return User.findById(args.id);
            }
        },
        users: {   // Search : you can update it to find by whatever
            type: new GraphQLList(UserType), 
            resolve(parent, args){
               return User.find({ });
            }
        },
        hobby: { 
            type: HobbyType, 
            args: {id: {type: GraphQLString}}, 

            resolve(parent, args){
                return Hobby.findById(args.id);
            }
        },

        hobbies: { 
            type: new GraphQLList(HobbyType), 

            resolve(parent, args){
                return Hobby.find({});
            }
        },
        post: { 
            type: PostType, 
            args: {id: {type: GraphQLID}}, 

            resolve(parent, args){
                return Post.findById(args.id);
            }
        },
        
        posts: { 
            type: new GraphQLList(HobbyType), 
            resolve(parent, args){
                return Post.find({});
            }
        }
        
    }
});

// MUTATIONS 
const Mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        createUser: {
            type: UserType, 
            args:{
               name: {type: new GraphQLNonNull (GraphQLString)}, 
               age:  {type: GraphQLInt}, 
               profession: {type: GraphQLString}, 
            }, 
            resolve(parent, args){
               let user = new User ({
                   name: args.name, 
                   age: args.age, 
                   profession: args.profession,
               });
               user.save(); 
               return user; 
            }
        },

        updateUser: {
            type: UserType, 
            args:{
               id: {type: new GraphQLNonNull (GraphQLID)},
               name: {type: new GraphQLNonNull (GraphQLString)}, 
               age:  {type: GraphQLInt}, 
               profession: {type: GraphQLString}, 
            }, 
            resolve(parent, args){

               return updatedUser = User.findByIdAndUpdate(
                    args.id,   
                {
                    $set: {
                        name: args.name, 
                        age: args.age, 
                        profession: args.profession
                        } 
                },
                {new: true} // send back the updated user.
                )
            }
        },
        createPost: {
            type: PostType, 
            args:{
               comment: {type: GraphQLString}, 
               userId:  {type: GraphQLID}, 
            }, 
            resolve(parent, args){
               let post = new Post ({
                comment: args.comment, 
                userId: args.userId, 
               });
                post.save(); 
                return post;
            }
        },
        createHobby: {
            type: HobbyType, 
            args:{
               title: {type: GraphQLString}, 
               description: {type: GraphQLString}, 
               userId:  {type: GraphQLID}, 
            }, 
            resolve(parent, args){
               let hobby = new Hobby ({
                title: args.title, 
                description: args.description, 
                userId: args.userId, 
               });
                hobby.save(); 
                return hobby;
            }
        }                   
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutation: Mutation

});