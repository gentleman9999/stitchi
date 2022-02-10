import { gql } from '@apollo/client'
import { BlogPostCard, CmsStructuredText } from '@components/common'
import { BlogIndexPageArticleFragment } from '@generated/BlogIndexPageArticleFragment'
import { BlogPostIndexPageCategoryFragment } from '@generated/BlogPostIndexPageCategoryFragment'
import { BlogPostIndexPagePageFragment } from '@generated/BlogPostIndexPagePageFragment'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import { Container } from 'ui'
import BlogPostIndexPageFilters from './BlogPostIndexPageFilters'
import BlogPostIndexPageSeo from './BlogPostIndexPageSeo'

export interface BlogPostIndexPageProps {
  articles: BlogIndexPageArticleFragment[]
  categories: BlogPostIndexPageCategoryFragment[]
  page: BlogPostIndexPagePageFragment
}

const BlogIndexPage = ({
  articles,
  categories,
  page,
}: BlogPostIndexPageProps) => {
  const router = useRouter()
  const { categorySlug } = router.query

  const activeCategory = categories.find(
    category => category.slug === categorySlug,
  )

  return (
    <>
      <BlogPostIndexPageSeo category={activeCategory} page={page} />
      <Container className="relative">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              {`Promotional Products Wiki ${
                activeCategory?.name ? `: ${activeCategory.name}` : ''
              }`}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              {activeCategory?.description ? (
                <CmsStructuredText content={activeCategory.description} />
              ) : (
                <>
                  Promotional Products can be a big asset to your brand. Learn
                  how the pros use promotional products to increase sales and
                  increase brand awareness.
                </>
              )}
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
                title: category.shortName || category.name,
                href: routes.internal.blog.category.href({
                  categorySlug: category.slug,
                }),
                active: category.slug === activeCategory?.slug,
              })),
            ]}
          />
          <div className="mt-12 mb-5 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {articles.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </>
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
    ${CmsStructuredText.fragments.categoryDescription}
    ${BlogPostIndexPageSeo.fragments.category}
    fragment BlogPostIndexPageCategoryFragment on CategoryRecord {
      id
      name
      shortName
      slug
      description {
        ...CmsStructuredTextCategoryDescriptionFragment
      }
      ...BlogPostIndexPageSeoCategoryFragment
    }
  `,
  page: gql`
    ${BlogPostIndexPageSeo.fragments.page}
    fragment BlogPostIndexPagePageFragment on BlogIndexPageRecord {
      ...BlogPostIndexPageSeoPageFragment
    }
  `,
}

export default BlogIndexPage
