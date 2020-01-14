import * as functions from 'firebase-functions'
import { ApolloServer } from 'apollo-server-cloud-functions'
import { typeDefs, resolvers } from './graphql/schema'


// const posts = [
//   { id: 1, title: 'sample1', status: 'ok' },
//   { id: 2, title: 'sample2', status: 'ok' },
//   { id: 3, title: 'sample3', status: 'bad' },
// ]

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable graphiql gui
  introspection: true,
  playground: true,
});

exports.graphql = functions.https.onRequest(server.createHandler({
  cors: {
    origin: 'http://localhost:3000',
    methods: '*',
    // preflightContinue: false,
    // optionsSuccessStatus: 204
    // credentials: true,
  },
}));
