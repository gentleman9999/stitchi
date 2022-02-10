import { gql } from '@apollo/client'
import { CmsSeo } from '@components/common'
import { BlogPostIndexPageSeoPageFragment } from '@generated/BlogPostIndexPageSeoPageFragment'
import { BlogPostIndexPageSeoCategoryFragment } from '@generated/BlogPostIndexPageSeoCategoryFragment'
import React from 'react'

interface Props {
  page: BlogPostIndexPageSeoPageFragment
  category?: BlogPostIndexPageSeoCategoryFragment | null
}

const BlogPostIndexPageSeo = ({ category, page }: Props) => {
  return <CmsSeo seo={category?._seoMetaTags || page?._seoMetaTags || []} />
}

BlogPostIndexPageSeo.fragments = {
  category: gql`
    ${CmsSeo.fragments.seoTags}
    fragment BlogPostIndexPageSeoCategoryFragment on CategoryRecord {
      id
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  `,
  page: gql`
    ${CmsSeo.fragments.seoTags}
    fragment BlogPostIndexPageSeoPageFragment on BlogIndexPageRecord {
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  `,
}

export default BlogPostIndexPageSeo
