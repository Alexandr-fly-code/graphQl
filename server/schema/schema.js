const graphql = require("graphql");
const _= require('lodash');

const { 
  GraphQLObjectType,
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt,
  GraphQLList
} = graphql;

const books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorsId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorsId: '2'},
  {name: 'The Long first', genre: 'one', id: '3', authorsId: '3'},
  {name: 'The Long second', genre: 'two', id: '4', authorsId: '3'},
  {name: 'The Long third', genre: 'three', id: '5', authorsId: '3'}
]

const authors = [
  {name: 'Patrick', age: 23, id: '1'},
  {name: 'Mary', age: 18, id: '2'},
  {name: 'Alison', age: 34, id: '3'},
  {name: 'Alisons1', age: 34, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return authors.find(el => el.id === parent.authorsId)
      }
    }
  }) 
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books.filter(el => el.authorsId === parent.id)
      }
    }
  }) 
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        // code to get data from db / other sourse
        return books.find(el => el.id === args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        return authors.find(el => el.id === args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query:  RootQuery
})