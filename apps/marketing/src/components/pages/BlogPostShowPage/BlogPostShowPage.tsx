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
import BlogPostJsonLD from './BlogPostJsonLD'
import Breadcrumbs from '@components/common/Breadcrumbs'
import routes from '@lib/routes'

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
      <BlogPostJsonLD post={post} />
      <Container className="!max-w-4xl">
        {post.title && post.slug ? (
          <div className="mb-3">
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: 'Articles & Guides',
                  href: routes.internal.blog.href(),
                },
                {
                  label: post.title,
                  href: routes.internal.blog.show.href(post.slug),
                },
              ]}
            />
          </div>
        ) : null}

        <article className="prose prose-stone prose-headings:font-heading lg:prose-lg m-auto max-w-none">
          {post.image?.responsiveImage && (
            <div className="not-prose mb-12 max-h-[60vh] overflow-hidden rounded-lg">
              <CmsImage
                priority
                data={post.image.responsiveImage}
                lazyLoad={false}
                usePlaceholder={false}
                layout="responsive"
              />
            </div>
          )}

          <div className="relative mx-auto max-w-4xl">
            <BackgroundTexture />

            <div className="mb-3">
              <time>
                <span>{humanizeDate(post._createdAt)}</span>
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
                <section className="p-4 prose-a:text-current prose-a:no-underline hover:prose-a:underline bg-gray-100 rounded-md ">
                  <div className="not-prose">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-headingDisplay font-bold text-gray-600 mt-0 mb-4">
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
    ${BlogPostJsonLD.fragments.article}
    fragment BlogPostShowPageArticleFragment on ArticleRecord {
      id
      title
      _publishedAt
      _createdAt
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
        id
        responsiveImage(sizes: "") {
          ...CmsImageFragment
        }
      }
      content {
        ...CmsStructuredTextContentFragment
      }
      ...BlogPostShowPageSEOArticleFragment
      ...BlogPostJsonLDArticleFragment
    }
  `,
}

export default BlogPostShowPage
