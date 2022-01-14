import { gql } from '@apollo/client'
import { Avatar, CmsImage, CmsStructuredText } from '@components/common'
import { BlogPostShowPageArticleFragment } from '@generated/BlogPostShowPageArticleFragment'
import React from 'react'
import { BackgroundTexture, Container } from 'ui'
import { humanizeDate } from '@utils/date'

export interface BlogShowPageProps {
  post: BlogPostShowPageArticleFragment
}

const BlogPostShowPage = ({ post }: BlogShowPageProps) => {
  return (
    <>
      <BackgroundTexture />
      <div>
        <Container>
          <article className="prose prose-fuchsia lg:prose-xl max-w-none">
            <div className="mb-12 max-w-none">
              <CmsImage data={post.image?.responsiveImage} />
            </div>
            <div className="mx-auto max-w-prose">
              <time>{humanizeDate(post.updatedAt)}</time>
              <h1>{post.title}</h1>
              <address>
                <Avatar image={post.author.image.responsiveImage} />
                {post.author.name}
              </address>
              <div className="relative">
                <CmsStructuredText content={post.content} />
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
    ${Avatar.fragments.image}
    ${CmsStructuredText.fragments.content}
    fragment BlogPostShowPageArticleFragment on ArticleRecord {
      id
      title
      updatedAt
      author {
        id
        name
        image {
          responsiveImage {
            ...AvatarImageFragment
          }
        }
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
