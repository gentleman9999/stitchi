'use client'

import { ComponentErrorMessage } from '@/components/common'
import { Container, LoadingDots } from '@/components/ui'
import { useNewsletterSubscribeForm } from '@/hooks'
import { initializeApollo } from '@/lib/apollo'
import routes from '@/lib/routes'
import { notEmpty } from '@/utils/typescript'
import { getFragmentData, gql } from '@/__generated__'
import {
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables,
} from '@/__generated__/graphql'
import { useQuery } from '@apollo/client'
import { ArrowRight } from 'icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import cx from 'classnames'

const client = initializeApollo()

export default function Page() {
  const { data, error } = useQuery<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageData, { client, variables: {} })

  const { form, handleSubmit, submitError, submitLoading } =
    useNewsletterSubscribeForm()

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  const featuredCategories = getFragmentData(
    GlossaryCategoryFragment,
    data?.featuredCategories,
  )

  const productTypeCategories = getFragmentData(
    GlossaryCategoryFragment,
    data?.productTypeCategories,
  )

  const supplyChainCategories = getFragmentData(
    GlossaryCategoryFragment,
    data?.supplyChainCategories,
  )

  const featuredIssues =
    data?.newsletter?.allNewsletterIssues?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return (
    <>
      <section className="py-10 sm:py-16 md:py-20 lg:py-28">
        <Container>
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headingDisplay font-bold text-black max-w-3xl sm:w-[80%]">
              Your go-to source for custom merch news and expert ratings
            </h1>
            <p className="text-gray-700 text md:text-lg lg:text-xl mt-4 sm:w-[60%] max-w-xl">
              Stay up-to-date and entertained with our weekly newsletter,
              featuring the latest trends, product reviews, and industry
              insights – all for free.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:rounded-md sm:overflow-hidden mt-10 sm:shadow-2xl w-full max-w-sm">
              <label className="sr-only" htmlFor="name">
                Email address
              </label>
              <input
                required
                placeholder="youremail@example.com"
                className="py-1 px-3 sm:py-3 sm:px-6 rounded-md sm:rounded-r-none text-lg sm:focus:outline-black flex-1 outline sm:outline-none"
                {...form.register('email')}
              />
              <button
                type="submit"
                className="relative bg-gray-800 text-white text-lg py-1 px-3 sm:py-3 sm:px-6 font-medium rounded-md sm:rounded-l-none"
              >
                <div className={submitLoading ? 'opacity-0' : ''}>Try it</div>
                <div
                  className={cx(
                    'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0',
                    {
                      'opacity-100': submitLoading,
                    },
                  )}
                >
                  <i>
                    <LoadingDots />
                  </i>
                </div>
              </button>
            </div>

            {submitError ? (
              <div className="mt-2">
                <ComponentErrorMessage error={submitError} />
              </div>
            ) : null}

            {form.formState.errors.email?.message ? (
              <p className="text-red-500 text-sm mt-2">
                {form.formState.errors.email?.message}
              </p>
            ) : null}
          </form>
        </Container>
      </section>
      <Container>
        <section className="py-20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading">
              Latest issues
            </h2>
            <Link
              href={routes.internal.newsletter.href()}
              className="text-lg sm:text-xl font-semibold underline"
            >
              <div className="group flex items-center">
                All issues{' '}
                <ArrowRight
                  className="group-hover:translate-x-1 transition-all ml-1"
                  strokeWidth={2.5}
                  width={20}
                />
              </div>
            </Link>
          </div>
          <ul className="flex sm:grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 overflow-scroll">
            {featuredIssues.map(issue =>
              issue.thumbnailUrl ? (
                <li
                  key={issue.id}
                  className="flex-[65vw] max-w-[200px] sm:flex-1 sm:max-w-none shrink-0"
                >
                  <article>
                    <div className="flex flex-col sm:flex-row gap-3 rounded-sm">
                      <Link
                        href={routes.internal.newsletter.issues.show.href({
                          issueSlug: issue.slug,
                        })}
                      >
                        <div className="relative w-auto sm:w-48 h-32 rounded-md overflow-hidden shrink-0">
                          <Image
                            fill
                            src={issue.thumbnailUrl}
                            style={{ objectFit: 'cover' }}
                            alt={issue.title}
                          />
                        </div>
                      </Link>

                      <div className="">
                        <Link
                          href={routes.internal.newsletter.issues.show.href({
                            issueSlug: issue.slug,
                          })}
                        >
                          <h2 className="text font-bold cursor-pointer">
                            {issue.title}
                          </h2>
                        </Link>

                        {issue.subtitle ? (
                          <p className="text">{issue.subtitle}</p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      </Container>

      <div className="bg-gray-50">
        <Container>
          <section className="flex flex-col gap-8 sm:gap-10 md:gap-16 py-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
              Explore companies
            </h2>

            <div className="flex flex-col gap-16">
              <h3 className="sr-only">Featured categories</h3>
              <CategoryList
                categories={featuredCategories?.children?.map(c => ({
                  slug: c?.slug,
                  title: c?.title,
                }))}
              />

              <CategoryList
                title="By type"
                categories={supplyChainCategories?.children?.map(c => ({
                  slug: c?.slug,
                  title: c?.title,
                }))}
              />

              <CategoryList
                title="By product"
                categories={productTypeCategories?.children?.map(c => ({
                  slug: c?.slug,
                  title: c?.title,
                }))}
              />
            </div>
          </section>
        </Container>
      </div>
    </>
  )
}

const CategoryList = ({
  title,
  categories,
}: {
  title?: string
  categories?: ({ slug?: string | null; title?: string | null } | null)[]
}) => {
  if (!categories) return null

  return (
    <div className="flex flex-col gap-8">
      {title ? (
        <h3 className="text-3xl font-semibold font-heading">{title}</h3>
      ) : null}
      <ul className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
        {categories.map(category =>
          category?.slug ? (
            <li key={category.slug}>
              <Link
                className="p-2 sm:p-3 md:p-4 border text-center font-semibold rounded-md hover:border-gray-400 block transition-all"
                href={routes.internal.directory.categories.show.href({
                  categorySlug: category.slug,
                })}
              >
                {category.title}
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}

const GlossaryCategoryFragment = gql(/* GraphQL */ `
  fragment GlossaryCategoryFragment on GlossaryCategoryRecord {
    id
    slug
    children {
      id
      title
      slug
    }
  }
`)

const GetHomePageData = gql(/* GraphQL */ `
  query GetHomePageData {
    newsletter {
      allNewsletterIssues(first: 4) {
        edges {
          node {
            id
            slug
            title
            subtitle
            thumbnailUrl
          }
        }
      }
    }
    featuredCategories: glossaryCategory(filter: { id: { eq: "147376160" } }) {
      id
      ...GlossaryCategoryFragment
    }
    supplyChainCategories: glossaryCategory(
      filter: { id: { eq: "146755585" } }
    ) {
      id
      ...GlossaryCategoryFragment
    }
    productTypeCategories: glossaryCategory(
      filter: { id: { eq: "146755607" } }
    ) {
      id
      ...GlossaryCategoryFragment
    }
  }
`)
