import { gql } from '@apollo/client'
import {
  CmsImage,
  CmsStructuredText,
  CmsStructuredTextTableOfContents,
} from '@components/common'
import { BlogPostShowPageArticleFragment } from '@generated/BlogPostShowPageArticleFragment'
import React from 'react'
import { BackgroundTexture, Container } from 'ui'
import { humanizeDate } from '@utils/date'
import BlogPostShowPageAuthor from './BlogPostShowPageAuthor'
import BlogPostShowPageSeo from './BlogPostShowPageSeo'

export interface BlogShowPageProps {
  post: BlogPostShowPageArticleFragment
}

const BlogPostShowPage = ({ post }: BlogShowPageProps) => {
  if (!post.content) {
    return null
  }

  return (
    <>
      <BlogPostShowPageSeo article={post} />
      <div>
        <Container>
          <article className="prose prose-fuchsia lg:prose-xl max-w-none">
            {post.image?.responsiveImage && (
              <div className="not-prose mb-12 max-w-none max-h-[60vh] overflow-hidden rounded-lg">
                <CmsImage
                  data={post.image.responsiveImage}
                  lazyLoad={false}
                  usePlaceholder={false}
                  layout="responsive"
                />
              </div>
            )}

            <div className="relative mx-auto max-w-prose">
              <BackgroundTexture />

              <div className="mb-3">
                <time>
                  <span>{humanizeDate(post.updatedAt)}</span>
                </time>
              </div>

              <h1>{post.title}</h1>
              <div className="divide-y divide-gray-200">
                {post.author && (
                  <div className="not-prose mb-10">
                    <BlogPostShowPageAuthor author={post.author} />
                  </div>
                )}

                <section className="py-10 prose-a:text-current prose-a:no-underline hover:prose-a:underline">
                  <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight font-bold text-accent-6 mb-4">
                    Overview
                  </p>
                  <CmsStructuredTextTableOfContents content={post.content} />
                </section>

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
    ${CmsStructuredText.fragments.articleContent}
    ${BlogPostShowPageSeo.fragments.article}
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
        responsiveImage(sizes: "") {
          ...CmsImageFragment
        }
      }
      content {
        ...CmsStructuredTextContentFragment
      }
      ...BlogPostShowPageSEOArticleFragment
    }
  `,
}

export default BlogPostShowPage
