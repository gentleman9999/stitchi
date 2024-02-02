import { gql } from '@apollo/client'
import CmsSeo, { CmsSeoFragments } from '@components/common/CmsSeo'
import { BlogPostShowPageSEOArticleFragment } from '@generated/BlogPostShowPageSEOArticleFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import React from 'react'

interface Props {
  article: BlogPostShowPageSEOArticleFragment
}

const BlogPostShowPageSeo = ({ article }: Props) => {
  return (
    <CmsSeo
      seo={article._seoMetaTags || []}
      canonicalUrl={makeAbsoluteUrl(
        routes.internal.learn.show.href(article.slug || ''),
      )}
    />
  )
}

BlogPostShowPageSeo.fragments = {
  article: gql`
    ${CmsSeoFragments.seoTags}
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
