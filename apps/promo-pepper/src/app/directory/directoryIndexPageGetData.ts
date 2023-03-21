import { gql } from '@/__generated__'
import { DirectoryIndexPageGetDataQueryVariables } from '@/__generated__/graphql'

export const directoryIndexPageGetData = gql(`
  query DirectoryIndexPageGetData(
  $first: IntType
  $skip: IntType
  $filter: GlossaryEntryModelFilter
) {
  ...DirectoryIndexPageQuery
  }
`)

export const defaultQueryVariables: DirectoryIndexPageGetDataQueryVariables = {
  first: 20,
  filter: { entryType: { eq: 'companies' } },
}
