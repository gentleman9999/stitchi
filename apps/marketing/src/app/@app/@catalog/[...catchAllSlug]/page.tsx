import {
  BrandOrCategoryPageGetDataQuery,
  BrandOrCategoryPageGetDataQueryVariables,
} from '@generated/types'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import staticWebsiteData from '@generated/static.json'
import CatchAllPage from './CatchAllPage'
import { GET_DATA } from './graphql'
import { notEmpty } from '@lib/utils/typescript'

interface Params {
  catchAllSlug: string[]
}

export const generateStaticParams = (): Params[] => {
  const params = [
    ...staticWebsiteData.brands.map(brand => ({
      catchAllSlug: [brand.custom_url?.url.replace(/\//g, '')].filter(notEmpty),
    })),
    ...staticWebsiteData.categories.map(category => ({
      catchAllSlug: [category.custom_url.url.replace(/^\/|\/$/g, '')],
    })),
  ]

  return params
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const path = getPath(params.catchAllSlug.join('/'))

  if (!path) {
    return {}
  }

  const { data } = await client.query<
    BrandOrCategoryPageGetDataQuery,
    BrandOrCategoryPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path,
    },
  })

  const node = data?.site.route.node

  if (node?.__typename === 'Brand') {
    return {
      title: `Browse ${node.name} products`,
      description: node.seo.metaDescription,
    }
  }

  if (node?.__typename === 'Category') {
    return {
      title: `Browse ${node.name} products`,
      description: node.seo.metaDescription,
    }
  }

  return {}
}

const Page = ({ params }: { params: Params }) => {
  const path = getPath(params.catchAllSlug.join('/'))

  if (!path) {
    return notFound()
  }

  return <CatchAllPage path={path} />
}

const allBrandSlugs = staticWebsiteData.brands
  .map(brand => brand.custom_url?.url.replace(/\//g, ''))
  .filter(notEmpty)

const allCategorySlugs = staticWebsiteData.categories.map(
  // Remove leading and trailing slashes
  category => category.custom_url.url.replace(/^\/|\/$/g, ''),
)

const getPath = (slug?: string) => {
  if (slug === undefined) {
    return null
  }

  if (allBrandSlugs.includes(slug) || allCategorySlugs.includes(slug)) {
    // This slug is either for a brand or for a category
    return `/${slug}/`
  }

  return null
}

export default Page
