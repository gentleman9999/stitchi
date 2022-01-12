import { gql } from '@apollo/client'
import { BlogPostCard } from '@components/common'
import { BlogIndexPageArticleFragment } from '@generated/BlogIndexPageArticleFragment'
import { BlogPostIndexPageCategoryFragment } from '@generated/BlogPostIndexPageCategoryFragment'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import BlogPostIndexPageFilters from './BlogPostIndexPageFilters'

export interface BlogPostIndexPageProps {
  articles: BlogIndexPageArticleFragment[]
  categories: BlogPostIndexPageCategoryFragment[]
}

const BlogIndexPage = ({ articles, categories }: BlogPostIndexPageProps) => {
  const router = useRouter()
  const { categorySlug } = router.query

  const activeCategory = categories.find(
    category => category.slug === categorySlug,
  )

  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>
        <BlogPostIndexPageFilters
          filters={[
            {
              title: 'All',
              href: routes.internal.blog.href(),
              active: !activeCategory,
            },
            ...categories.map(category => ({
              title: category.name,
              href: routes.internal.blog.category.href({
                categorySlug: category.slug,
              }),
              active: category.slug === activeCategory?.slug,
            })),
          ]}
        />
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {articles.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

BlogIndexPage.fragments = {
  article: gql`
    ${BlogPostCard.fragments.article}
    fragment BlogIndexPageArticleFragment on ArticleRecord {
      id
      ...BlogPostCardArticleFragment
    }
  `,
  category: gql`
    fragment BlogPostIndexPageCategoryFragment on CategoryRecord {
      id
      name
      slug
    }
  `,
}

export default BlogIndexPage
