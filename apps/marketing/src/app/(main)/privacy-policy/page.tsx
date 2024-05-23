import { gql } from '@apollo/client'
import Section from '@components/common/Section'
import Container from '@components/ui/Container'
import { getClient } from '@lib/apollo-rsc'
import React from 'react'
import {
  PrivacyGetDataQuery,
  PrivacyGetDataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { toNextMetadata } from 'react-datocms/seo'
import routes from '@lib/routes'
import CmsStructuredText from '@components/common/_dato-cms/CmsStructuredText'

export const generateMetadata = async (): Promise<Metadata> => {
  const client = await getClient()

  const {
    data: { privacyPolicyPage },
  } = await client.query<PrivacyGetDataQuery, PrivacyGetDataQueryVariables>({
    query: GET_DATA,
  })

  if (!privacyPolicyPage) {
    notFound()
  }

  const cmsSeo = toNextMetadata(privacyPolicyPage._seoMetaTags)

  return {
    ...cmsSeo,
    openGraph: {
      ...cmsSeo.openGraph,
      url: routes.internal.legal.privacy.href(),
    },
  }
}

const Privacy = async () => {
  const client = await getClient()
  const {
    data: { privacyPolicyPage },
  } = await client.query<PrivacyGetDataQuery, PrivacyGetDataQueryVariables>({
    query: GET_DATA,
  })

  if (!privacyPolicyPage?.content) {
    notFound()
  }

  return (
    <Container>
      <Section gutter="lg" className="prose prose-lg prose-fuchsia m-auto">
        <CmsStructuredText content={privacyPolicyPage.content} />
      </Section>
    </Container>
  )
}

const GET_DATA = gql`
  ${CmsStructuredText.fragments.privacyPolicyContent}
  query PrivacyGetDataQuery {
    privacyPolicyPage {
      id
      _seoMetaTags {
        attributes
        content
        tag
      }
      content {
        ...CmsStructuredTextPrivacyPolicyContentFragment
      }
    }
  }
`

export default Privacy
