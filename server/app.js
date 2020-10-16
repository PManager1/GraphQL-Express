const express = require('express'); 
const mongoose = require('mongoose'); 

const { graphqlHTTP } = require('express-graphql');
const app = express(); 
const schema = require('./schema');
const testSchema = require('../schema/types_schema');

mongoose.connect("mongodb://user:jallimlab9$@ds139715.mlab.com:39715/newdb", {
  useNewUrlParser: "true",
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    // schema: testSchema,
}))

app.listen(4000 , () =>{
    console.log('listening for requests on 4000'); 

});