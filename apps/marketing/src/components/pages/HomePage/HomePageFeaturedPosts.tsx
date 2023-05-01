import { gql } from '@apollo/client'
import { BlogPostCard, Section } from '@components/common'
import { HomePageFeaturedPostsPostsFragment } from '@generated/HomePageFeaturedPostsPostsFragment'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'

interface Props {
  posts: HomePageFeaturedPostsPostsFragment[]
}

const HomePageFeaturedPosts = ({ posts }: Props) => {
  if (!posts.length) return null

  return (
    <Section label="Featured articles" gutter="md">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Make the most of merch
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Unleash your brand&apos;s potential with creative promotional products
          and targeted marketing strategies - explore our articles for valuable
          insights.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.slice(0, 3).map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <Link
          href={routes.internal.blog.href()}
          className="flex items-center underline font-medium text-xl"
        >
          View all articles <ArrowRight />
        </Link>
      </div>
    </Section>
  )
}

HomePageFeaturedPosts.fragments = {
  posts: gql`
    ${BlogPostCard.fragments.article}
    fragment HomePageFeaturedPostsPostsFragment on ArticleRecord {
      id
      ...BlogPostCardArticleFragment
    }
  `,
}

export default HomePageFeaturedPosts
