import { gql } from '@apollo/client'

export const fragments = {
  faqGroup: gql`
    fragment CmsFAQGroupFaqGroupRecordFragment on FaqGroupRecord {
      id
      expandAll
      faqs {
        id
        question
        answer
      }
    }
  `,
}
