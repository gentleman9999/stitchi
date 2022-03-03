import { gql } from '@apollo/client'
import { CmsStructuredTextTableOfContentsContentFragment } from '@generated/CmsStructuredTextTableOfContentsContentFragment'
import { Adapter, isDocument, isHeading } from 'datocms-structured-text-utils'
import React from 'react'
import s from './style.module.css'

import recursiveListGenerator from './recursive-list-generator'

interface Props {
  content: CmsStructuredTextTableOfContentsContentFragment
}

const CmsStructuredTextTableofContents = ({ content }: Props) => {
  const { value } = content

  if (isDocument(value)) {
    const headings = value.document.children
      .filter(isHeading)
      .filter(h => h.level <= 3)
    return (
      <div
        className={s.toc}
        dangerouslySetInnerHTML={{
          __html: recursiveListGenerator(headings, 1, '', 0),
        }}
      />
    )
  }

  return null
}

export default CmsStructuredTextTableofContents

CmsStructuredTextTableofContents.fragments = {
  articleContent: gql`
    fragment CmsStructuredTextTableOfContentsContentFragment on ArticleModelContentField {
      value
      blocks
    }
  `,
}
