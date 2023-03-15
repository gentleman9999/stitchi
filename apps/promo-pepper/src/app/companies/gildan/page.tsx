import { companies } from '@/app/mock'
import { Container } from '@/components/ui'
import routes from '@/lib/routes'
import { ArrowRight } from 'icons'
import Image from 'next/image'
import Link from 'next/link'
import { gql } from '@apollo/client'
import {
  CompanyPageGetDataQuery,
  CompanyPageGetDataQueryVariables,
} from '@/__generated__/graphql'
import { initializeApollo } from '@/lib/apollo'

export default async function Companies() {
  const client = initializeApollo()

  const { data } = await client.query<
    CompanyPageGetDataQuery,
    CompanyPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: { companySlug: 'gildan' },
  })

  const { company } = data || {}

  const websiteUrl = getWebsiteUrl(company)

  return company ? (
    <>
      <Container>
        <section className="py-12" aria-label="hero">
          <div className="flex gap-10 justify-between">
            <div>
              <h1 className="text-heading text-5xl font-bold">
                {company.term}
              </h1>
              <p className="mt-2 text-xl">{company.definition}</p>
              {websiteUrl ? (
                <div className="mt-4">
                  <Link href={websiteUrl} className="underline font-bold">
                    {company.businessUrl || company.term}
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="relative w-48 h-48">
              <Image
                fill
                src={`https://picsum.photos/400?random=${company.id}`}
                style={{ objectFit: 'cover' }}
                alt={`${company.term} cover`}
              />
            </div>
          </div>
        </section>
        <hr />
        <section aria-label="description" className="py-12">
          <h2 className="text-2xl">Overview</h2>
          <div className="flex gap-10 justify-between mt-4">
            <div className="prose prose-lg">
              <p>
                This is a bunch of placeholder text that I am writing to see how
                some formatting shows up on the company page. It&apos;s great
                that you&apos;ve continued reading this far because this text is
                absolutely meaningless. Thank you!
              </p>
              <p>
                Here&apos;s another paragraph to demonstrate what it may look
                like for a company to have a description with a second,
                meaningless, paragraph. At this point if you&apos;ve made it
                this far you are wasting company $ and should consider moving on
                to something else. Thank you, again!
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <DataPoint label="Year founded" value="1983" />
              <DataPoint label="Employees" value="500-1000" />
              <DataPoint label="CEO" value="Jordan Sack" />
            </div>
          </div>
        </section>
        <hr />
        <section aria-label="similar companies" className="py-12">
          <h2 className="text-2xl">Related companies</h2>

          <ul className="flex gap-8 mt-4">
            {companies.slice(0, 3).map(company => (
              <li key={company.id} className="flex-1">
                <Link
                  href={routes.internal.directory.companies.show.href({
                    companySlug: company.slug,
                  })}
                  className="border px-4 py-2 w-full text-xl font-medium rounded-md flex justify-between items-center group"
                >
                  {company.term}

                  <ArrowRight className="group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  ) : null
}

/* TODO: Figure out better semantic representation of this data */
function DataPoint({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <dt className="bg-gray-100 p-2 rounded-md w-full">
      <label className="">{label}</label>
      <td className="font-medium text-xl">{value}</td>
    </dt>
  )
}

const getWebsiteUrl = (company: CompanyPageGetDataQuery['company']) => {
  const param = 'referrer'
  const value = typeof window !== 'undefined' ? window.location.href : null

  const url = new URL(company?.affiliateUrl || company?.businessUrl || '')

  if (!url) return null

  if (value) {
    url.searchParams.append(param, value)
  }

  return url
}

const GET_DATA = gql`
  query CompanyPageGetData($companySlug: String!) {
    company: glossaryEntry(filter: { slug: { eq: $companySlug } }) {
      id
      term
      definition
      businessUrl
      affiliateUrl

      description {
        __typename
      }
      primaryImage {
        id
      }
    }
  }
`
