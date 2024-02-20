'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import CmsLandingPageAppDir from '@components/common/CmsLandingPageAppDir'
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
    <CmsLandingPageAppDir
      href={routes.internal.insights.href()}
      landingPage={landingPage}
    />
  )
}

const GET_DATA = gql`
  ${CmsLandingPageAppDir.fragments.landingPage}
  query InsightIndexPageGetDataQuery {
    landingPage(filter: { id: { eq: "D2HV_J7hTKmi0T2hgBN1-w" } }) {
      id
      ...CmsLandingPageAppDirFragment
    }
  }
`

export default Page
