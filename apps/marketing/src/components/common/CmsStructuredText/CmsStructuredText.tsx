import { gql } from '@apollo/client'
import { CmsStructuredTextContentFragment } from '@generated/CmsStructuredTextContentFragment'
import { StructuredText } from 'react-datocms'

interface Props {
  content: CmsStructuredTextContentFragment
}

const CmsStructuredText = ({ content }: Props) => {
  return <StructuredText data={content.value} />
}

CmsStructuredText.fragments = {
  content: gql`
    fragment CmsStructuredTextContentFragment on ArticleModelContentField {
      value
    }
  `,
}

export default CmsStructuredText
