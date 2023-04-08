import { Container } from '@/components/ui'
import { initializeApollo } from '@/lib/apollo'
import routes from '@/lib/routes'
import { notEmpty } from '@/utils/typescript'
import { gql } from '@/__generated__'
import {
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables,
} from '@/__generated__/graphql'
import { ArrowRight } from 'icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { notFound } from 'next/navigation'
import HeaderSubscribeForm from './HeaderSubscribeForm'
// import CompanyCategorySection from './CompanyCategorySection'

export default async function Page() {
  const client = initializeApollo()

  const { data, error } = await client.query<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >({ query: GetHomePageData, variables: {} })

  if (error) {
    console.error(error)
    return notFound()
  }

  const featuredIssues =
    data?.newsletter?.allNewsletterIssues?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return (
    <>
      <section className="py-10 sm:py-16 md:py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14">
            <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headingDisplay font-bold text-black max-w-3xl sm:w-[80%]">
                Your go-to source for custom merch news and expert ratings
              </h1>
              <p className="text-gray-700 text md:text-lg lg:text-xl sm:w-[60%] max-w-xl">
                Stay up-to-date and entertained with our weekly newsletter,
                featuring the latest trends, product reviews, and industry
                insights – all for free.
              </p>
            </div>

            <HeaderSubscribeForm />
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading">
              Latest issues
            </h2>
            <Link
              href={routes.internal.newsletter.href()}
              className="text-lg sm:text-xl font-semibold underline decoration-primary"
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
        </Container>

        <Container className="overflow-x-scroll">
          <ul className="flex sm:grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8">
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
                        <div className="shadow-lg rounded-md">
                          <div className="relative w-auto sm:w-48 h-32 rounded-md overflow-hidden shrink-0">
                            <Image
                              fill
                              src={issue.thumbnailUrl}
                              style={{ objectFit: 'cover' }}
                              alt={issue.title}
                            />
                          </div>
                        </div>
                      </Link>

                      <div className="">
                        <Link
                          href={routes.internal.newsletter.issues.show.href({
                            issueSlug: issue.slug,
                          })}
                        >
                          <h2 className="text font-bold cursor-pointer hover:underline decoration-primary">
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
        </Container>
      </section>

      {/* <CompanyCategorySection
        featuredCategories={data.featuredCategories}
        productTypeCategories={data.productTypeCategories}
        supplyChainCategories={data.supplyChainCategories}
      /> */}
    </>
  )
}

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
    # featuredCategories: glossaryCategory(filter: { id: { eq: "147376160" } }) {
    #   id
    #   ...CompanyCategorySectionCompany
    # }
    # supplyChainCategories: glossaryCategory(
    #   filter: { id: { eq: "146755585" } }
    # ) {
    #   id
    #   ...CompanyCategorySectionCompany
    # }
    # productTypeCategories: glossaryCategory(
    #   filter: { id: { eq: "146755607" } }
    # ) {
    #   id
    #   ...CompanyCategorySectionCompany
    # }
  }
`)
