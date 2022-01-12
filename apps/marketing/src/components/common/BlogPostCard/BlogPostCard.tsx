import { gql } from '@apollo/client'
import { BlogPostCardArticleFragment } from '@generated/BlogPostCardArticleFragment'
import routes from '@lib/routes'
import { humanizeDate } from '@utils/date'
import Link from 'next/link'
import React from 'react'
import { CmsImage } from '@components/common'

export interface BlogPostCardProps {
  post: BlogPostCardArticleFragment
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const category = post.categories[0]
  const postHref = routes.internal.blog.show.href(post.slug)
  const categoryHref = routes.internal.blog.category.href({
    categorySlug: category.slug,
  })

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <CmsImage
          data={post.image.responsiveImage}
          className="h-40 w-full"
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-lime-500">
            <Link href={categoryHref}>
              <a className="hover:underline">{category.name}</a>
            </Link>
          </p>
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
          <div className="flex-shrink-0">
            {/* <a href={post.author.href}> */}
            <span className="sr-only">{post.author.name}</span>
            <div className="h-10 w-10 rounded-full relative overflow-hidden">
              <CmsImage
                data={post.author.image.responsiveImage}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* </a> */}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {/* <a href={post.author.href} className="hover:underline"> */}
              {post.author.name}
              {/* </a> */}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.updatedAt}>
                {humanizeDate(post.updatedAt, { short: true })}
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

    fragment BlogPostCardArticleFragment on ArticleRecord {
      id
      updatedAt
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
          responsiveImage(
            imgixParams: { w: 50, h: 50, fit: crop, q: 80, auto: format }
          ) {
            ...CmsImageFragment
          }
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
