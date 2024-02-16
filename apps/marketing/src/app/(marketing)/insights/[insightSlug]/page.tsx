'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import CmsLandingPageAppDir from '@components/common/CmsLandingPageAppDir'
import {
  InsightShowPageGetDataQuery,
  InsightShowPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    insightSlug: string
  }
}

const Page = ({ params }: Props) => {
  const { data } = useSuspenseQuery<
    InsightShowPageGetDataQuery,
    InsightShowPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { slug: params.insightSlug },
  })

  const landingPage = data?.landingPage

  if (!landingPage) {
    console.error('Landing page not found')
    notFound()
  }

  return (
    <CmsLandingPageAppDir
      href={routes.internal.insights.show.href({
        insightSlug: params.insightSlug,
      })}
      landingPage={landingPage}
      parentBreadcrumbs={[
        {
          href: routes.internal.insights.href(),
          label: 'Insights',
        },
      ]}
    />
  )
}

const GET_DATA = gql`
  ${CmsLandingPageAppDir.fragments.landingPage}
  query InsightShowPageGetDataQuery($slug: String!) {
    landingPage(filter: { slug: { eq: $slug } }) {
      id
      ...CmsLandingPageAppDirFragment
    }
  }
`

export default Page
