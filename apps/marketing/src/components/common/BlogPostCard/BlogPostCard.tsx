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
    <article className="flex flex-col items-start">
      {post.image?.responsiveImage && (
        <div className="relative w-full">
          <CmsImage
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
          <div className="mt-8 flex items-center gap-x-4 text-xs">
            <time dateTime={post._createdAt} className="text-gray-500">
              {humanizeDate(post._createdAt, { short: true })}
            </time>
            <Link
              href={categoryHref}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {category.name}
            </Link>
          </div>
        ) : null}

        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={postHref}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {post.shortDescription}
          </p>
        </div>

        {post.author ? (
          <div className="relative mt-8 flex items-center gap-x-4">
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
    ${CmsImage.fragments.image}
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
