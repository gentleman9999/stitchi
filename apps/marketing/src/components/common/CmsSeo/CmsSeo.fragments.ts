import { gql } from '@apollo/client'

export const fragments = {
  seoTags: gql`
    fragment CmsSeoTagsFragment on Tag {
      attributes
      content
      tag
    }
  `,
}
