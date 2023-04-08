import { initializeApollo } from '@/lib/apollo'
import { gql } from '@/__generated__'
import {
  GetFilterPreviewQuery,
  GetFilterPreviewQueryVariables,
} from '@/__generated__/graphql'
import { useLazyQuery } from '@apollo/client'

const client = initializeApollo()

export default function useFilterPreview() {
  const [getPreview, { data, loading }] = useLazyQuery<
    GetFilterPreviewQuery,
    GetFilterPreviewQueryVariables
  >(GetFilterPreview, { client })

  const get = (categoryIds: string[]) => {
    getPreview({
      variables: {
        filter: {
          entryType: { eq: 'companies' },
          categories: { anyIn: categoryIds },
        },
      },
    })
  }

  const count = data?._allGlossaryEntriesMeta?.count ?? 0

  return [get, { loading, count }] as const
}

export const GetFilterPreview = gql(/* GraphQL */ `
  query GetFilterPreview($filter: GlossaryEntryModelFilter) {
    _allGlossaryEntriesMeta(filter: $filter) {
      count
    }
  }
`)
