import { gql } from '@apollo/client'
import CmsStructuredText from '@components/common/_dato-cms/CmsStructuredText'
import CmsStructuredTextTableofContents from '@components/common/_dato-cms/CmsStructuredTextTableOfContents'

export const GET_DATA = gql`
  ${CmsStructuredTextTableofContents.fragments.glossaryTermDescription}
  ${CmsStructuredText.fragments.glossaryEntryDescription}

  query PromotionalProductGlossaryTermGetDataQuery($slug: String!) {
    glossaryEntry(filter: { slug: { eq: $slug } }) {
      id
      term
      slug
      definition
      entryType
      businessUrl
      affiliateUrl
      description {
        ...CmsStructuredTextGlossaryDescriptionFragment
        ...CmsStructuredTextTableOfContentsGlossaryTermDescriptionFragment
      }
    }
    relatedTerms: allGlossaryEntries(
      filter: { description: { exists: true }, slug: { neq: $slug } }
      first: 3
    ) {
      id
      term
      slug
      entryType
    }
  }
`
