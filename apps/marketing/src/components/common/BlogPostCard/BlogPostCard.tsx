import { gql } from '@apollo/client'
import { BlogPostCardArticleFragment } from '@generated/BlogPostCardArticleFragment'
import routes from '@lib/routes'
import { humanizeDate } from '@lib/utils/date'
import Link from 'next/link'
import React from 'react'
import Avatar from '../Avatar'
import CmsResponsiveImage from '../_dato-cms/CmsResponsiveImage'

export interface BlogPostCardProps {
  post: BlogPostCardArticleFragment
  variant?: 'vertical' | 'horizontal'
}

const BlogPostCard = ({ post, variant = 'vertical' }: BlogPostCardProps) => {
  const category = post.categories[0]
  const postHref = post.slug ? routes.internal.learn.show.href(post.slug) : null
  const categoryHref = category?.slug
    ? routes.internal.learn.category.href({
        categorySlug: category.slug,
      })
    : null

  if (!postHref) {
    return null
  }

  if (variant === 'horizontal') {
    return (
      <article className="flex flex-col items-start @container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
          <div className="relative w-full md:w-2/5 hidden @md:block">
            {post.image?.responsiveImage && (
              <CmsResponsiveImage
                data={post.image.responsiveImage}
                layout="responsive"
                objectFit="cover"
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            )}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="mt-4 md:mt-0 md:ml-4 w-full @md:w-3/5">
            <div className="relative">
              <h3 className="mt-1 text-sm font-semibold leading-tight text-gray-900">
                <Link href={postHref}>{post.title}</Link>
              </h3>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-1 text-gray-600">
              {post.shortDescription}
            </p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="flex flex-col items-start">
      {post.image?.responsiveImage && (
        <div className="relative w-full">
          <CmsResponsiveImage
            data={post.image.responsiveImage}
            layout="responsive"
            objectFit="cover"
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      )}
      <div className="max-w-xl">
        {categoryHref ? (
          <div className="mt-4 md:mt-8 flex items-center gap-x-4 text-xs">
            <time dateTime={post._createdAt} className="text-gray-500">
              {humanizeDate(post._createdAt, { short: true })}
            </time>
            <Link
              href={categoryHref}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 text-xs md:text-base"
            >
              {category.name}
            </Link>
          </div>
        ) : null}

        <div className="group relative">
          <h3 className="mt-2 md:mt-3 text-base md:text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={postHref}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 md:mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {post.shortDescription}
          </p>
        </div>

        {post.author ? (
          <div className="relative mt-4 md:mt-8 flex items-center gap-x-2 md:gap-x-4">
            {post.author.image ? <Avatar image={post.author.image} /> : null}

            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="absolute inset-0" />
                {post.author.name}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

BlogPostCard.fragments = {
  article: gql`
    ${CmsResponsiveImage.fragments.image}
    ${Avatar.fragments.image}
    fragment BlogPostCardArticleFragment on ArticleRecord {
      id
      _publishedAt
      _createdAt
      title
      slug
      shortDescription
      image {
        responsiveImage(imgixParams: { auto: format }) {
          ...CmsResponsiveImageFragment
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
