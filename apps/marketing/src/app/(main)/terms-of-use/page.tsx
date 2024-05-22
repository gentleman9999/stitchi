import { gql } from '@apollo/client'
import CmsStructuredText from '@components/common/.dato-cms/CmsStructuredText'
import Section from '@components/common/Section'
import Container from '@components/ui/Container'
import { TermsGetDataQuery } from '@generated/TermsGetDataQuery'
import { TermsGetDataQueryVariables } from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { toNextMetadata } from 'react-datocms/seo'

export const generateMetadata = async (): Promise<Metadata> => {
  const client = await getClient()
  const {
    data: { termsOfUsePage },
  } = await client.query<TermsGetDataQuery, TermsGetDataQueryVariables>({
    query: GET_DATA,
  })

  if (!termsOfUsePage) {
    notFound()
  }

  const cmsSeo = toNextMetadata(termsOfUsePage._seoMetaTags)

  return {
    ...cmsSeo,
    openGraph: {
      ...cmsSeo.openGraph,
      url: routes.internal.legal.terms.href(),
    },
  }
}

const Terms = async () => {
  const client = await getClient()
  const {
    data: { termsOfUsePage },
  } = await client.query<TermsGetDataQuery, TermsGetDataQueryVariables>({
    query: GET_DATA,
  })

  if (!termsOfUsePage?.content) {
    notFound()
  }

  return (
    <Container>
      <Section gutter="lg" className="prose prose-lg prose-fuchsia m-auto">
        <CmsStructuredText content={termsOfUsePage.content} />
      </Section>
    </Container>
  )
}

const GET_DATA = gql`
  ${CmsStructuredText.fragments.termsOfUseContent}

  query TermsGetDataQuery {
    termsOfUsePage {
      id
      _seoMetaTags {
        attributes
        content
        tag
      }
      content {
        ...CmsStructuredTextTermsOfUseContentFragment
      }
    }
  }
`
export default Terms
