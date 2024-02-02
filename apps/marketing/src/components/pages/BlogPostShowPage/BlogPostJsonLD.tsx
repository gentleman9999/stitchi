import { gql } from '@apollo/client'
import { BlogPostJsonLDArticleFragment } from '@generated/BlogPostJsonLDArticleFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { ArticleJsonLd, ArticleJsonLdProps } from 'next-seo'
import React from 'react'

const BlogPostJsonLD = ({ post }: { post: BlogPostJsonLDArticleFragment }) => {
  const articleJsonLd: ArticleJsonLdProps = {
    authorName: post.author?.name || 'Stitchi',
    datePublished: post._publishedAt,
    title: post.title || 'Untitled',
    publisherLogo: makeAbsoluteUrl('/public/stitchi_logo.svg'),
    publisherName: 'Stitchi',
    url: post.slug ? routes.internal.learn.show.href(post.slug) : '',
    description: post._seoMetaTags?.find(
      tag => tag.attributes?.property === 'og:description',
    )?.attributes?.content,
    images: post.image?.image ? [post.image.image.src] : [],
    type: 'Article',
    dateModified: post._updatedAt,
  }

  return <ArticleJsonLd {...articleJsonLd} />
}

BlogPostJsonLD.fragments = {
  article: gql`
    fragment BlogPostJsonLDArticleFragment on ArticleRecord {
      id
      title
      slug
      _publishedAt
      _updatedAt
      _seoMetaTags {
        attributes
      }
      author {
        id
        name
      }
      image {
        id
        image: responsiveImage(sizes: "") {
          src
        }
      }
    }
  `,
}

export default BlogPostJsonLD
