import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/types'
import { GET_DATA, makeDefaultQueryVariables } from './graphql'

const getServerSideData = async (
  client: ApolloClient<NormalizedCacheObject>,
  {
    after,
    brandEntityId,
    categoryEntityId,
  }: { after?: string; brandEntityId?: number; categoryEntityId?: number },
) => {
  await client.query<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      ...makeDefaultQueryVariables({ brandEntityId, categoryEntityId }),
      after: typeof after === 'string' ? after : undefined,
    },
  })
}

export default getServerSideData
