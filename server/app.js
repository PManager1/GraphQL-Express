const express = require('express'); 

const { graphqlHTTP } = require('express-graphql');
const app = express(); 
// import schema from './schema/schema';
const schema = require('./schema');
const testSchema = require('./types_schema');


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    // schema,
    schema: testSchema,
}))

app.listen(4000 , () =>{
    console.log('listening for requests on 4000'); 

});