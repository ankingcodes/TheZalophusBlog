const express=require('express');
const graphqlHttp=require('express-graphql');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const logger = require('morgan');


//get user model for mongodb
const UserModel=require('./models/user');

//get graphql resolvers and schema
const graphqlSchema=require('./graphql/schema/index');
const graphqlResolvers=require('./graphql/resolvers/index');


//initialize express
const app = express();

//set all middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//allow header and options method
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

//server initialization
app.listen(3002, ()=>
{
  console.log('connected to 3002');
})

//connect to mongo database
mongoose.connect(`mongodb+srv://sankha:sankha@cluster0-blgns.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser:true, useUnifiedTopology:true })
.then((res)=>
{
    console.log('mongodb connected');
})
.catch((err)=>
{ 
  console.log(err); 
})

