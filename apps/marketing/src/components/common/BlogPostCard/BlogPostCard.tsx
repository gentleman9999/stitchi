import { gql } from '@apollo/client'
import { BlogPostCardArticleFragment } from '@generated/BlogPostCardArticleFragment'
import routes from '@lib/routes'
import { humanizeDate } from '@utils/date'
import Link from 'next/link'
import React from 'react'
import Avatar from '../Avatar'
import CmsImage from '../CmsImage'

export interface BlogPostCardProps {
  post: BlogPostCardArticleFragment
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const category = post.categories[0]
  const postHref = post.slug ? routes.internal.blog.show.href(post.slug) : null
  const categoryHref = category.slug
    ? routes.internal.blog.category.href({
        categorySlug: category.slug,
      })
    : null

  if (!postHref) {
    return null
  }

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      {post.image?.responsiveImage && (
        <div className="flex-shrink-0">
          <CmsImage
            data={post.image.responsiveImage}
            className="h-40 w-full"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      )}
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          {categoryHref && (
            <p className="text-sm font-medium text-lime-500">
              <Link href={categoryHref}>
                <a className="hover:underline">{category.name}</a>
              </Link>
            </p>
          )}
          <Link href={postHref}>
            <a className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              <p className="mt-3 text-base text-gray-500">
                {post.shortDescription}
              </p>
            </a>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          {post.author?.image && (
            <div className="flex-shrink-0">
              {/* <a href={post.author.href}> */}
              <span className="sr-only">{post.author?.name}</span>
              <Avatar image={post.author.image} />
              {/* </a> */}
            </div>
          )}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {/* <a href={post.author.href} className="hover:underline"> */}
              {post.author?.name}
              {/* </a> */}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post._publishedAt}>
                {humanizeDate(post._publishedAt, { short: true })}
              </time>
              {/* <span aria-hidden="true">&middot;</span> */}
              {/* <span>{post.readingTime} read</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

BlogPostCard.fragments = {
  article: gql`
    ${CmsImage.fragments.image}
    ${Avatar.fragments.image}
    fragment BlogPostCardArticleFragment on ArticleRecord {
      id
      _publishedAt
      title
      slug
      shortDescription
      image {
        responsiveImage(imgixParams: { auto: format }) {
          ...CmsImageFragment
        }
      }
      author {
        id
        name
        image {
          id
          ...AvatarImageFragment
        }
      }
      categories {
        id
        name
        slug
      }
    }
  `,
}

export default BlogPostCard
