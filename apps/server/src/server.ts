import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { getOrThrow } from './utils'
import { schema as mainGraphSchema } from './graphql/schema'
import context from './graphql/context'
import express from 'express'
import http from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import { makeSchema as makeDatoCmsSchema } from './dato-cms-schema'
import { makeSchema as makeBigCommerceSchema } from './bigcommerce-schema'
import createRestApi from './rest'
import { delegateToSchema } from '@graphql-tools/delegate'
import { Kind, OperationTypeNode } from 'graphql'
import { WrapQuery } from '@graphql-tools/wrap'
import { NestedDelegationTransform } from './utils/schema'

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise', reason, p)
  })
  .on('uncaughtException', err => {
    console.error('Uncaught Exception thrown', err)
  })

const PORT = getOrThrow(process.env.PORT, 'PORT')

const makeGatewaySchema = async () => {
  const bigCommerceSchema = await makeBigCommerceSchema()

  return stitchSchemas({
    subschemas: [
      { schema: makeExecutableSchema({ typeDefs: await makeDatoCmsSchema() }) },
      {
        schema: mainGraphSchema,
        batch: true,
        merge: {
          Product: {
            selectionSet: '{ id prices { price { value } } }',
            fieldName: '_products',
            key: ({ id, prices }) => ({ id, prices }),
            argsFromKeys: keys => ({
              products: keys,
            }),
          },
        },
      },
      {
        schema: makeExecutableSchema({
          typeDefs: bigCommerceSchema,
        }),
        batch: true,
      },
    ],
    resolvers: {
      DesignRequestProduct: {
        product: {
          selectionSet: '{ bigCommerceProductId }',
          resolve: async (parent, _, context, info) => {
            if (!parent.bigCommerceProductId) {
              return null
            }

            return delegateToSchema({
              schema: bigCommerceSchema,
              operation: OperationTypeNode.QUERY,
              fieldName: 'site.product',
              args: {
                entityId: parseInt(parent.bigCommerceProductId),
              },
              context,
              info,
              transforms: [
                new NestedDelegationTransform(),
                /**
                 * Use WrapQuery to delegate to a sub-field of userSchema, approximately equivalent to:
                 *
                 * query {
                 *   viewer(token: $token) {
                 *     user(username: $username) {
                 *       ...subtree
                 *     }
                 *   }
                 * }
                 */
                // new WrapQuery(
                //   ['site'],
                //   subtree => ({
                //     kind: Kind.SELECTION_SET,
                //     selections: [
                //       {
                //         kind: Kind.FIELD,
                //         name: {
                //           kind: Kind.NAME,
                //           value: 'product',
                //         },
                //         arguments: [
                //           {
                //             kind: Kind.ARGUMENT,
                //             name: { kind: Kind.NAME, value: 'entityId' },
                //             value: {
                //               kind: Kind.INT,
                //               value: parent.bigCommerceProductId,
                //             },
                //           },
                //         ],
                //         selectionSet: subtree,
                //       },
                //     ],
                //   }),
                //   result => result && result.product,
                // ),
              ],
            })
          },
        },
      },
    },
  })
}

async function startApolloServer() {
  const server = new ApolloServer({
    schema: await makeGatewaySchema(),
    context: context.makeDefaultContext(),
    introspection:
      getOrThrow(
        process.env.GRAPHQL_INTROSPECTION_ENABLED,
        'GRAPHQL_INTROSPECTION_ENABLED',
      ) === 'true',
  })

  const app = express()
  const httpServer = http.createServer(app)

  await server.start()
  server.applyMiddleware({ app })

  createRestApi(app)

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}

startApolloServer()
