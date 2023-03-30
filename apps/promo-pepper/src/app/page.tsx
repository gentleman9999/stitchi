'use client'

import { ComponentErrorMessage } from '@/components/common'
import { Container } from '@/components/ui'
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

const client = initializeApollo()

export default function Page() {
  const { data, loading, error } = useQuery<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageData, { client, variables: {} })

  if (error) {
    // TODO: bring back once beehiiv working
    // return <ComponentErrorMessage error={error} />
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

  // const featuredIssues =
  //   data?.newsletter?.allNewsletterIssues?.nodes.filter(notEmpty) || []

  const handleSubmit = () => {}

  return (
    <>
      <section className="py-28">
        <Container>
          <div>
            <h1 className="text-5xl font-headingDisplay font-bold text-black max-w-3xl">
              Your go-to source for custom merch news and expert ratings
            </h1>
            <p className="text-black text-xl font-medium mt-4 w-[70%] max-w-xl">
              Stay up-to-date and entertained with our weekly newsletter,
              featuring the latest trends, product reviews, and industry
              insights – all for free.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-md overflow-hidden mt-10 shadow-2xl w-full max-w-sm flex"
          >
            <label className="sr-only" htmlFor="name">
              Email address
            </label>
            <input
              required
              name="email"
              placeholder="youremail@example.com"
              className="py-3 px-6 rounded-l-md text-lg focus:outline-black flex-1"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white text-lg py-3 px-6 font-medium"
            >
              Try it
            </button>
          </form>
        </Container>
      </section>
      <Container>
        <section className="py-20">
          <div className="flex justify-between items-center">
            <h2 className="text-5xl font-bold font-heading">Latest issues</h2>
            <Link
              href={routes.internal.newsletter.href()}
              className="text-xl font-semibold underline"
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
          <ul className="grid grid-cols-2 gap-8 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="col-span-1">
                <article>
                  <Link
                    href={routes.internal.newsletter.issues.show.href({
                      issueSlug: '',
                    })}
                    className="rounded-sm flex gap-3"
                  >
                    <div className="relative w-48 h-32 rounded-md overflow-hidden shrink-0">
                      <Image
                        fill
                        src={`https://picsum.photos/seed/${i}/300/200`}
                        style={{ objectFit: 'cover' }}
                        alt="TODO: everest"
                      />
                    </div>
                    <div>
                      <h2 className="text font-bold">This is an issue title</h2>
                      <p className="text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <div className="bg-gray-50">
        <Container>
          <section className="py-10">
            {/* {featuredIssues.map(issue => (
            <div key={issue.id}>{issue.id}</div>
          ))} */}
          </section>
          <section className="flex flex-col gap-16 py-10">
            <h2 className="text-5xl font-bold font-heading">
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
      <ul className="flex gap-4 flex-wrap">
        {categories.map(category =>
          category?.slug ? (
            <li key={category.slug}>
              <Link
                className="p-4 border text-center font-medium rounded-sm hover:border-gray-400 block transition-all"
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
    # newsletter {
    #   allNewsletterIssues(first: 5) {
    #     nodes {
    #       id
    #     }
    #   }
    # }
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
