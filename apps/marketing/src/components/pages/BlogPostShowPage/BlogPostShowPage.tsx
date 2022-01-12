import { gql } from '@apollo/client'
import { CmsStructuredText } from '@components/common'
import { BlogPostShowPageArticleFragment } from '@generated/BlogPostShowPageArticleFragment'
import React from 'react'
import { BackgroundTexture } from 'ui'

export interface BlogShowPageProps {
  post: BlogPostShowPageArticleFragment
}

const BlogPostShowPage = (props: BlogShowPageProps) => {
  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <BackgroundTexture />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          {/* <CmsStructuredText content={props.post.content} /> */}
        </div>
      </div>
    </div>
  )
}

BlogPostShowPage.fragments = {
  article: gql`
    ${CmsStructuredText.fragments.content}
    fragment BlogPostShowPageArticleFragment on ArticleRecord {
      id
      content {
        ...CmsStructuredTextContentFragment
      }
    }
  `,
}

export default BlogPostShowPage
