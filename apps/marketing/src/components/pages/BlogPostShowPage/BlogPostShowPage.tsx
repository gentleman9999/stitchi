import { gql } from '@apollo/client'
import {
  CmsStructuredText,
  CmsStructuredTextTableOfContents,
  InlineMailingListSubscribe,
  Section,
} from '@components/common'
import { BlogPostShowPageArticleFragment } from '@generated/BlogPostShowPageArticleFragment'
import React from 'react'
import { humanizeDate } from '@lib/utils/date'
import BlogPostShowPageAuthor from './BlogPostShowPageAuthor'
import BlogPostShowPageSeo from './BlogPostShowPageSeo'
import BlogPostJsonLD from './BlogPostJsonLD'
import Breadcrumbs from '@components/common/Breadcrumbs'
import routes from '@lib/routes'
import Container from '@components/ui/Container'
import BackgroundTexture from '@components/ui/BackgroundTexture'
import CmsImage, { CmsImageFragments } from '@components/common/CmsImage'

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
        <article className="prose prose-stone prose-headings:font-heading lg:prose-lg m-auto max-w-none prose-h1:md:text-6xl prose-h1:lg:text-7xl">
          <Section gutter="lg">
            <h1 className="text-center !mb-12">{post.title}</h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              {post.author && (
                <div className="not-prose">
                  <BlogPostShowPageAuthor author={post.author} />
                </div>
              )}
              <div className="text-center">
                <time>
                  <span>{humanizeDate(post._createdAt)}</span>
                </time>
              </div>
            </div>

            {post.title && post.slug ? (
              <div className="!mb-20 flex justify-center sr-only sm:not-sr-only not-prose">
                <Breadcrumbs
                  breadcrumbs={[
                    {
                      label: 'Articles & Guides',
                      href: routes.internal.learn.href(),
                    },
                    {
                      label: post.title,
                      href: routes.internal.learn.show.href(post.slug),
                    },
                  ]}
                />
              </div>
            ) : null}
          </Section>

          {post.image?.responsiveImage && (
            <div className="not-prose mb-12 max-h-[60vh] overflow-hidden rounded-sm">
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

            <div>
              <div>
                <section className="p-4 prose-a:text-current prose-a:no-underline hover:prose-a:underline bg-gray-100 rounded-sm ">
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
    ${CmsImageFragments.image}
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
