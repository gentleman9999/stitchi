import React from 'react'
import DesignLibraryCategoryShowPage from './DesignLibraryCategoryShowPage'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { GET_DATA } from './graphql'
import {
  ProductPageGetDesignCategoryData,
  ProductPageGetDesignCategoryDataVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'
import { generateCmsSeo } from '@lib/seo'
import { toNextMetadata } from 'react-datocms/seo'
import routes from '@lib/routes'

interface Params {
  categorySlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const { data } = await client.query<
    ProductPageGetDesignCategoryData,
    ProductPageGetDesignCategoryDataVariables
  >({
    query: GET_DATA,
    variables: {
      designCategorySlug: {
        eq: params.categorySlug,
      },
    },
  })

  if (data.designCategory) {
    const cmsSeo = toNextMetadata(data.designCategory._seoMetaTags)

    return {
      ...cmsSeo,
      openGraph: {
        ...cmsSeo.openGraph,
        url: routes.internal.lookbook.categories.show.href({
          categorySlug: params.categorySlug,
        }),
      },
    }
  }

  return notFound()
}

const Page = ({ params }: { params: Params }) => {
  return <DesignLibraryCategoryShowPage categorySlug={params.categorySlug} />
}

export default Page
