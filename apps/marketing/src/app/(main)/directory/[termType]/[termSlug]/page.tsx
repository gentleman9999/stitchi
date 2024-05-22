import {
  PromotionalProductGlossaryTermGetDataQuery,
  PromotionalProductGlossaryTermGetDataQueryVariables,
} from '@generated/PromotionalProductGlossaryTermGetDataQuery'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import IndustryTermsShowPage from './IndustryTermsShowPage'
import { GET_DATA } from './graphql'

interface Params {
  termType: string
  termSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const {
    data: { glossaryEntry },
  } = await client.query<
    PromotionalProductGlossaryTermGetDataQuery,
    PromotionalProductGlossaryTermGetDataQueryVariables
  >({ query: GET_DATA, variables: { slug: params.termSlug } })

  if (!glossaryEntry) {
    return notFound()
  }

  return {
    title: glossaryEntry.term || 'Promotional product glossary',
    description: glossaryEntry.definition || undefined,
    openGraph: {
      url: routes.internal.glossary.show.href({
        termSlug: glossaryEntry.slug || '',
        termType: glossaryEntry.entryType || '',
      }),
    },
  }
}

const PromotionalProductGlossaryTerm = ({ params }: { params: Params }) => {
  return <IndustryTermsShowPage termSlug={params.termSlug} />
}

export default PromotionalProductGlossaryTerm
