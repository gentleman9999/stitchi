import { gql } from '@apollo/client'
import FeaturesPage from 'app/(main)/solutions/FeaturesPage'
import { FeaturesIndexPageGetDataQuery } from '@generated/types'
import routes from '@lib/routes'
import { Metadata } from 'next'
import React from 'react'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import { toNextMetadata } from 'react-datocms/seo'

export const generateMetadata = async (): Promise<Metadata> => {
  const client = await getClient()
  const {
    data: { featureIndexPage },
  } = await client.query<FeaturesIndexPageGetDataQuery>({ query: GET_DATA })

  if (!featureIndexPage) {
    notFound()
  }

  const cmsSeo = toNextMetadata(featureIndexPage._seoMetaTags)

  return {
    ...cmsSeo,
    openGraph: {
      ...cmsSeo.openGraph,
      url: routes.internal.solutions.href(),
    },
  }
}

const Features = () => {
  return <FeaturesPage />
}

const GET_DATA = gql`
  query FeaturesIndexPageGetDataQuery {
    featureIndexPage {
      id
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`

export default Features
