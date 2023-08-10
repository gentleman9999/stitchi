import { gql } from '@apollo/client'
import { CmsSeo } from '@components/common'
import { BlogPostIndexPageSeoPageFragment } from '@generated/BlogPostIndexPageSeoPageFragment'
import { BlogPostIndexPageSeoCategoryFragment } from '@generated/BlogPostIndexPageSeoCategoryFragment'
import React from 'react'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'

interface Props {
  page: BlogPostIndexPageSeoPageFragment
  category?: BlogPostIndexPageSeoCategoryFragment | null
}

const BlogPostIndexPageSeo = ({ category, page }: Props) => {
  return (
    <CmsSeo
      seo={category?._seoMetaTags || page?._seoMetaTags || []}
      canonicalUrl={makeAbsoluteUrl(
        category
          ? routes.internal.blog.category.href({
              categorySlug: category.slug || '',
            })
          : routes.internal.blog.href(),
      )}
    />
  )
}

BlogPostIndexPageSeo.fragments = {
  category: gql`
    ${CmsSeo.fragments.seoTags}
    fragment BlogPostIndexPageSeoCategoryFragment on CategoryRecord {
      id
      slug
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  `,
  page: gql`
    ${CmsSeo.fragments.seoTags}
    fragment BlogPostIndexPageSeoPageFragment on BlogIndexPageRecord {
      id
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  `,
}

export default BlogPostIndexPageSeo
