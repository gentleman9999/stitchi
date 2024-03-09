import routes from '@lib/routes'
import { Metadata } from 'next'
import { gql } from '@apollo/client'
import { initializeApollo } from '@lib/apollo'
import {
  CatalogDiscoverPageGetDataQuery,
  CatalogDiscoverPageGetDataQueryVariables,
} from '@generated/types'
import Section from '@components/common/Section'
import FeaturedCategory from './FeaturedCategory'
import Container from '@components/ui/Container'
import ClosetPageContainer from '@components/common/ClosetPageContainer'

const title = 'Discover Premium Customizable Apparel for Every Style & Budget'
const description = `Explore Stitchi's diverse catalog of high-quality, customizable clothing. Find the perfect fit for your style with our wide range of apparel`
const url = routes.internal.catalog.discover.href()

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
  },
}

const Page = async () => {
  const client = initializeApollo()

  const { data } = await client.query<
    CatalogDiscoverPageGetDataQuery,
    CatalogDiscoverPageGetDataQueryVariables
  >({
    query: GET_PAGE_DATA,
  })

  return (
    <ClosetPageContainer>
      <h1 className="text-4xl font-semibold">What would you like to create?</h1>
      <Section gutter="md">
        <div className="grid grid-cols-1">
          {data.productDiscoveryPage?.featuredCategories.map(category => (
            <Section gutter="md" key={category.id} className="">
              <h2 className="text-xl font-medium">{category?.name}</h2>
              <FeaturedCategory
                categoryEntityId={category.bigCommerceCategoryId}
              />
            </Section>
          ))}
        </div>
      </Section>
    </ClosetPageContainer>
  )
}

const GET_PAGE_DATA = gql`
  query CatalogDiscoverPageGetDataQuery {
    productDiscoveryPage {
      id
      featuredCategories {
        id
        bigCommerceCategoryId
        name
      }
    }
  }
`

export default Page
