import { gql } from '@apollo/client'
import { CmsSeo } from '@components/common'
import { BlogPostShowPageSEOArticleFragment } from '@generated/BlogPostShowPageSEOArticleFragment'
import React from 'react'

interface Props {
  article: BlogPostShowPageSEOArticleFragment
}

const BlogPostShowPageSeo = ({ article }: Props) => {
  return <CmsSeo seo={article._seoMetaTags || []} />
}

BlogPostShowPageSeo.fragments = {
  article: gql`
    ${CmsSeo.fragments.seoTags}
    fragment BlogPostShowPageSEOArticleFragment on ArticleRecord {
      id
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  `,
}

export default BlogPostShowPageSeo
