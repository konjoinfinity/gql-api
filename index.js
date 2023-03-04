const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose")

const app = express()

app.use("/", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)

const uri = process.env.MONGO_URI
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(uri, options)
  .then(() => app.listen(3000, console.log("Server is running")))
  .catch(error => {
    throw error
  })