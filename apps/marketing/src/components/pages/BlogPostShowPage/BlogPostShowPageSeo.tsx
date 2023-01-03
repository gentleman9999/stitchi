import { gql } from '@apollo/client'
import { CmsSeo } from '@components/common'
import { BlogPostShowPageSEOArticleFragment } from '@generated/BlogPostShowPageSEOArticleFragment'
import routes from '@lib/routes'
import React from 'react'

interface Props {
  article: BlogPostShowPageSEOArticleFragment
}

const BlogPostShowPageSeo = ({ article }: Props) => {
  return (
    <CmsSeo
      seo={article._seoMetaTags || []}
      canonicalUrl={routes.internal.blog.show.href(article.slug || '')}
    />
  )
}

BlogPostShowPageSeo.fragments = {
  article: gql`
    ${CmsSeo.fragments.seoTags}
    fragment BlogPostShowPageSEOArticleFragment on ArticleRecord {
      id
      slug
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  `,
}

export default BlogPostShowPageSeo
