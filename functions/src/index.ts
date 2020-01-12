import * as functions from 'firebase-functions'
import { ApolloServer, gql } from 'apollo-server-cloud-functions'

import * as admin from 'firebase-admin'

admin.initializeApp()

exports.hello = functions.https.onRequest((request, response) => {
  // tslint:disable-next-line: no-floating-promises
  admin
    .firestore()
    .collection('examples')
    .get()
    .then((querySnapshot: any) => {
      const records = querySnapshot.docs.map((elem: any) => elem.data())
      console.log(records)
    })
});

const examples = [
  { id: 1, name: 'exam1', message: 'message1' },
  { id: 2, name: 'exam2', message: 'message2' },
  { id: 3, name: 'exam3', message: 'message3' },
]

const samples = [
  { id: 1, title: 'sample1', status: 'ok' },
  { id: 2, title: 'sample2', status: 'ok' },
  { id: 3, title: 'sample3', status: 'bad' },
]

const typeDefs = gql`
  type Query {
    examples: [Example]
    samples: [Sample]
  }

  type Example {
    id: ID!
    name: String!
    message: String!
  }

  type Sample {
    id: ID!
    title: String!
    status: String!
  }
  `;

const resolvers = {
  Query: {
    examples: () => examples,
    samples: () => samples,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable graphiql gui
  introspection: true,
  playground: true,
});

exports.graphql = functions.https.onRequest(server.createHandler());
