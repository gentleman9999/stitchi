import { gql, useQuery } from '@apollo/client'
import CmsSeo, { CmsSeoFragments } from '@components/common/CmsSeo'
import { PrimaryLayout } from '@components/layout'
import FeaturesPage from '@components/pages/FeaturesPage'
import {
  FeaturesIndexPageGetDataQuery,
  FeaturesIndexPageGetDataQueryVariables,
} from '@generated/types'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { GetStaticProps } from 'next'
import React from 'react'

const url = makeAbsoluteUrl(routes.internal.features.href())

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo()

  await client.query<
    FeaturesIndexPageGetDataQuery,
    FeaturesIndexPageGetDataQueryVariables
  >({
    query: GET_DATA,
  })

  return addApolloState(client, { props: {} })
}

const Features = () => {
  const { data } = useQuery<
    FeaturesIndexPageGetDataQuery,
    FeaturesIndexPageGetDataQueryVariables
  >(GET_DATA)

  const seo = data?.featureIndexPage?._seoMetaTags

  return (
    <>
      {seo ? <CmsSeo canonicalUrl={url} seo={seo} /> : null}

      <FeaturesPage />
    </>
  )
}

Features.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${CmsSeoFragments.seoTags}
  query FeaturesIndexPageGetDataQuery {
    featureIndexPage {
      id
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
    }
  }
`

export default Features
