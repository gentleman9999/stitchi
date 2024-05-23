import { gql } from '@apollo/client'
import BlogPostCard from '@components/common/BlogPostCard'
import InlineMailingListSubscribe from '@components/common/InlineMailingListSubscribe'
import Section from '@components/common/Section'
import SubscribeInline from '@components/common/SubscribeInline'
import routes from '@lib/routes'
import React from 'react'
import BlogPostIndexPageFilters from './BlogPostIndexPageFilters'
import Link from 'next/link'
import Image from 'next/image'
import featuredPostImage from '../../../../public/cash-in-on-merch-book-cover.jpg'
import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'
import {
  BlogIndexPageArticleFragment,
  BlogPostIndexPageCategoryFragment,
} from '@generated/types'
import CmsStructuredText from '@components/common/_dato-cms/CmsStructuredText'

export interface BlogPostIndexPageProps {
  articles: BlogIndexPageArticleFragment[]
  categories?: BlogPostIndexPageCategoryFragment[]
  canFetchMore: boolean
  fetchMoreHref: string
  categorySlug?: string
}

const BlogPostIndexPage = ({
  articles,
  categories,
  canFetchMore,
  fetchMoreHref,
  categorySlug,
}: BlogPostIndexPageProps) => {
  const activeCategory = categories?.find(
    category => category.slug === categorySlug,
  )

  return (
    <>
      <Container className="relative">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mt-12">
            <h1 className="text-4xl text-gray-900 sm:text-5xl font-headingDisplay uppercase">
              {activeCategory?.name
                ? `${activeCategory.name}`
                : 'Become a merch pro.'}
            </h1>

            <div className="mt-3 max-w-4xl mx-auto text text-gray-500 sm:mt-4">
              {activeCategory?.description ? (
                <CmsStructuredText content={activeCategory.description} />
              ) : (
                <>
                  Promotional products can be a big asset to your brand. Learn
                  how the pros use promotional products to increase sales and
                  increase brand awareness.
                </>
              )}
            </div>

            <div className="flex justify-center py-8 ">
              <SubscribeInline />
            </div>
          </div>

          {activeCategory ? null : (
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="col-span-1 bg-gray-100 p-4 rounded-sm">
                  <Link
                    href={routes.internal.learn.category.href({
                      categorySlug: 'college-merch-business',
                    })}
                  >
                    <span className="text-gray-400">Cash in on Merch</span>
                    <h3 className="text-2xl font-bold mb-4 font-headingDisplay">
                      Student&apos;s Guide to Starting A Custom Merch Business
                    </h3>
                  </Link>

                  <Link
                    href={routes.internal.learn.category.href({
                      categorySlug: 'college-merch-business',
                    })}
                  >
                    <div className="relative w-full mb-2">
                      <Image
                        {...featuredPostImage}
                        priority
                        alt="Cash In On Merch book cover"
                        className="aspect-[16/9] w-full object-contain sm:aspect-[2/1] lg:aspect-[4/2] drop-shadow-xl"
                      />
                    </div>
                  </Link>

                  <p className="text-gray-500 mt-8 text-sm">
                    In this 8-part guide, we&apos;ll walk you through the
                    step-by-step process of launching your own custom
                    merchandise venture, from ideation to execution. Learn how
                    to identify your target market, design compelling products,
                    and master the strategies to effectively promote and sell
                    your merchandise, all while juggling your academic
                    responsibilities.
                  </p>
                </div>
                <div>
                  <div className="col-span-1 flex-col gap-4 hidden md:flex">
                    {articles.slice(0, 3).map(post => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        variant="horizontal"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <BlogPostIndexPageFilters
            filters={[
              {
                id: 'all',
                key: 'all',
                title: 'All',
                href: routes.internal.learn.href(),
                active: !activeCategory,
              },
              ...(categories
                ?.filter(c => Boolean(c.slug))
                .map(category => ({
                  id: category.id,
                  key: category.slug,
                  title: category.shortName || category.name || 'Category',
                  href: routes.internal.learn.category.href({
                    categorySlug: category.slug!,
                  }),
                  active: category.slug === activeCategory?.slug,
                })) || []),
            ]}
          />

          <div className="mt-12 mb-5 max-w-lg mx-auto grid gap-20 lg:gap-6 lg:grid-cols-3 lg:max-w-none">
            {activeCategory ? null : (
              // On mobile, we remove featured posts (the first three posts). This is us adding in the featured posts.
              <div className="md:hidden grid gap-10">
                {articles.slice(0, 3).map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {articles
              .slice(activeCategory ? 0 : 3)
              .map(post =>
                post ? <BlogPostCard key={post.id} post={post} /> : null,
              )}
          </div>

          {canFetchMore ? (
            <div className="flex justify-center">
              <Button
                Component={Link}
                href={fetchMoreHref}
                className="mt-2"
                size="2xl"
              >
                Load more
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

BlogPostIndexPage.fragments = {
  article: gql`
    ${BlogPostCard.fragments.article}
    fragment BlogIndexPageArticleFragment on ArticleRecord {
      id
      ...BlogPostCardArticleFragment
    }
  `,
  category: gql`
    ${CmsStructuredText.fragments.categoryDescription}
    fragment BlogPostIndexPageCategoryFragment on CategoryRecord {
      id
      name
      shortName
      slug
      description {
        ...CmsStructuredTextCategoryDescriptionFragment
      }
    }
  `,
}

export default BlogPostIndexPage
