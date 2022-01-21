import { gql } from '@apollo/client'
import { CmsImage, CmsStructuredText } from '@components/common'
import { BlogPostShowPageArticleFragment } from '@generated/BlogPostShowPageArticleFragment'
import React from 'react'
import { BackgroundTexture, Container } from 'ui'
import { humanizeDate } from '@utils/date'
import BlogPostShowPageAuthor from './BlogPostShowPageAuthor'

export interface BlogShowPageProps {
  post: BlogPostShowPageArticleFragment
}

const BlogPostShowPage = ({ post }: BlogShowPageProps) => {
  return (
    <>
      <div>
        <Container>
          <article className="prose prose-fuchsia lg:prose-xl max-w-none">
            <div className="mb-12 max-w-none">
              <CmsImage data={post.image?.responsiveImage} />
            </div>
            <div className="relative mx-auto max-w-prose">
              <BackgroundTexture />

              <div className="mb-3">
                <time>
                  <span>{humanizeDate(post.updatedAt)}</span>
                </time>
              </div>

              <h1>{post.title}</h1>
              <div className="divide-y divide-gray-200">
                <div className="not-prose mb-10">
                  <BlogPostShowPageAuthor author={post.author} />
                </div>
                <div>
                  <div className="mt-10">
                    <CmsStructuredText content={post.content} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Container>
      </div>
    </>
  )
}

BlogPostShowPage.fragments = {
  article: gql`
    ${CmsImage.fragments.image}
    ${BlogPostShowPageAuthor.fragments.author}
    ${CmsStructuredText.fragments.content}
    fragment BlogPostShowPageArticleFragment on ArticleRecord {
      id
      title
      updatedAt
      author {
        id
        ...BlogPostShowPageAuthorFragment
      }
      categories {
        id
        name
        slug
      }

      image {
        responsiveImage {
          ...CmsImageFragment
        }
      }
      content {
        ...CmsStructuredTextContentFragment
      }
    }
  `,
}

export default BlogPostShowPage
