import { gql } from '@apollo/client'
import {
  CmsImage,
  CmsStructuredText,
  CmsStructuredTextTableOfContents,
  InlineMailingListSubscribe,
  Section,
} from '@components/common'
import { BlogPostShowPageArticleFragment } from '@generated/BlogPostShowPageArticleFragment'
import React from 'react'
import { BackgroundTexture, Container } from '@components/ui'
import { humanizeDate } from '@utils/date'
import BlogPostShowPageAuthor from './BlogPostShowPageAuthor'
import BlogPostShowPageSeo from './BlogPostShowPageSeo'
import { StructuredText } from 'react-datocms'

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
      <Container>
        <article className="prose prose-lime prose-headings:font-heading lg:prose-xl max-w-none">
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
                <span>{humanizeDate(post._publishedAt)}</span>
              </time>
            </div>

            <h1>{post.title}</h1>
            <div className="divide-y divide-gray-200">
              {post.author && (
                <div className="not-prose mb-10">
                  <BlogPostShowPageAuthor author={post.author} />
                </div>
              )}

              <div className="py-8">
                <section className="p-4 sm:p-6 md:p-8 lg:p-10 prose-a:text-current prose-a:no-underline hover:prose-a:underline bg-gray-100 rounded-lg shadow-lg">
                  <div className="not-prose">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-headingDisplay font-bold text-gray-600 mt-0 mb-6">
                      Overview
                    </p>
                  </div>

                  <CmsStructuredTextTableOfContents content={post.content} />
                </section>
              </div>

              <div>
                <div className="mt-10">
                  <CmsStructuredText content={post.content} />
                </div>
              </div>
            </div>
          </div>
        </article>
        <Section gutter="md">
          <InlineMailingListSubscribe />
        </Section>
      </Container>
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
      _publishedAt
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
