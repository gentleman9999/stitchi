import { gql } from '@/__generated__'
import { DirectoryIndexPageGetDataQueryVariables } from '@/__generated__/graphql'

export const directoryIndexPageGetData = gql(`
  query DirectoryIndexPageGetData(
  $first: IntType
  $skip: IntType
  $filter: GlossaryEntryModelFilter
) {
  directory: allGlossaryEntries(first: $first, skip: $skip, filter: $filter) {
    id
    ...DirectoryIndexPageEntry
  }

  directoryMetadata: _allGlossaryEntriesMeta(filter: $filter) {
    ...DirectoryIndexPageMetadata
  }
}
`)

export const defaultQueryVariables: DirectoryIndexPageGetDataQueryVariables = {
  first: 20,
  filter: { entryType: { eq: 'companies' } },
}
