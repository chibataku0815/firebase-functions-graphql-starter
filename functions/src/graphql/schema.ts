import { gql } from 'apollo-server-cloud-functions'
import * as admin from 'firebase-admin'
import { of } from 'rxjs'
// import { map, take, mergeMap, catchError } from 'rxjs/operators'

admin.initializeApp()

const typeDefs = gql`

  type Sample {
    id: Int!
    title: String!
    status: String!
  }

  type Post {
    # status: Status!
    id: ID!
    # createdAt: DateTime!
    # updatedAt: DateTime!
    title: String
    contents: String
    # thumbnail: Asset
  }

  type Query {
    posts: [Post]
    samples(limit: Int): [Sample]
  }
`;

const resolvers = {
  Query: {
    samples: async (parent: any, args: any) => {
      const workses = await admin
        .firestore()
        .collection('examples')
        .limit(args.limit)
        .get()
      of(1, 2, 3, workses).subscribe(n => {
        console.log(n);
      });
      console.log('--------------------------------------------------');
      // console.log(`arg id ${args.limit}`)
      return workses.docs.map(works => works.data())
    },
    // posts: () => posts
  },
};

export { typeDefs, resolvers };
