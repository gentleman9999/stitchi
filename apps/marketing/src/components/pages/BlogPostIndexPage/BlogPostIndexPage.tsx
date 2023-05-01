import { gql } from '@apollo/client'
import {
  BlogPostCard,
  CmsStructuredText,
  InfiniteScrollContainer,
  InlineMailingListSubscribe,
  Section,
} from '@components/common'
import { BlogIndexPageArticleFragment } from '@generated/BlogIndexPageArticleFragment'
import { BlogPostIndexPageCategoryFragment } from '@generated/BlogPostIndexPageCategoryFragment'
import { BlogPostIndexPagePageFragment } from '@generated/BlogPostIndexPagePageFragment'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Container } from '@components/ui'
import BlogPostIndexPageFilters from './BlogPostIndexPageFilters'
import BlogPostIndexPageSeo from './BlogPostIndexPageSeo'
import Link from 'next/link'

export interface BlogPostIndexPageProps {
  articles: BlogIndexPageArticleFragment[]
  categories?: BlogPostIndexPageCategoryFragment[]
  page: BlogPostIndexPagePageFragment
  canFetchMore: boolean
  loading: boolean
  fetchMoreHref: string
}

const BlogIndexPage = ({
  articles,
  categories,
  page,
  canFetchMore,
  loading,
  fetchMoreHref,
}: BlogPostIndexPageProps) => {
  const router = useRouter()
  const { categorySlug } = router.query

  const activeCategory = categories?.find(
    category => category.slug === categorySlug,
  )

  const handleFetchMore = () => {
    if (!loading && canFetchMore) {
      router.replace(fetchMoreHref, undefined, {
        scroll: false,
      })
    }
  }

  return (
    <>
      <BlogPostIndexPageSeo category={activeCategory} page={page} />
      <Container className="relative">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl font-headingDisplay">
              {`Promotional Products Wiki ${
                activeCategory?.name ? `: ${activeCategory.name}` : ''
              }`}
            </h1>
            <div className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              {activeCategory?.description ? (
                <CmsStructuredText content={activeCategory.description} />
              ) : (
                <>
                  Promotional Products can be a big asset to your brand. Learn
                  how the pros use promotional products to increase sales and
                  increase brand awareness.
                </>
              )}
            </div>
          </div>
          <BlogPostIndexPageFilters
            filters={[
              {
                key: 'all',
                title: 'All',
                href: routes.internal.blog.href(),
                active: !activeCategory,
              },
              ...(categories
                ?.filter(c => Boolean(c.slug))
                .map(category => ({
                  key: category.slug,
                  title: category.shortName || category.name || 'Category',
                  href: routes.internal.blog.category.href({
                    categorySlug: category.slug!,
                  }),
                  active: category.slug === activeCategory?.slug,
                })) || []),
            ]}
          />
          <div className="mt-12 mb-5 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
            {articles.map(post =>
              post ? <BlogPostCard key={post.id} post={post} /> : null,
            )}
          </div>

          <InfiniteScrollContainer onIntersect={handleFetchMore} />
          {canFetchMore ? (
            <div className="flex justify-center">
              <Button
                Component={Link}
                {...{ scroll: false, replace: true }}
                href={fetchMoreHref}
                className="mt-2"
                loading={loading}
              >
                Load More
              </Button>
            </div>
          ) : null}
        </div>
        <Section gutter="md">
          <InlineMailingListSubscribe />
        </Section>
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
      id
      ...BlogPostIndexPageSeoPageFragment
    }
  `,
}

export default BlogIndexPage
