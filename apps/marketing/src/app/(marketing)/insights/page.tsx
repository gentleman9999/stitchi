'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import CmsLandingPageV2 from '@components/common/CmsLandingPageV2'
import {
  InsightIndexPageGetDataQuery,
  InsightIndexPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { data } = useSuspenseQuery<
    InsightIndexPageGetDataQuery,
    InsightIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {},
  })

  const landingPage = data?.landingPage

  if (!landingPage) {
    console.error('Landing page D2HV_J7hTKmi0T2hgBN1-w not found')
    notFound()
  }

  return (
    <CmsLandingPageV2
      href={routes.internal.insights.href()}
      landingPage={landingPage}
    />
  )
}

const GET_DATA = gql`
  ${CmsLandingPageV2.fragments.landingPage}
  query InsightIndexPageGetDataQuery {
    landingPage(filter: { id: { eq: "D2HV_J7hTKmi0T2hgBN1-w" } }) {
      id
      ...CmsLandingPageV2Fragment
    }
  }
`

export default Page
