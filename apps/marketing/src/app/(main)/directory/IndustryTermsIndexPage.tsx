'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import Container from '@components/ui/Container'
import React from 'react'
import { motion } from 'framer-motion'
import Section from '@components/common/Section'
import IndustryTermCard from '@components/common/IndustryTermCard'
import Navigation from './Navigation'
import { notEmpty } from '@lib/utils/typescript'
import {
  PromotionalProductGlossaryGetDataQuery,
  PromotionalProductGlossaryGetDataQueryVariables,
} from '@generated/types'

interface Props {}

const IndustryTermsIndexPage = ({}: Props) => {
  const { data } = useSuspenseQuery<
    PromotionalProductGlossaryGetDataQuery,
    PromotionalProductGlossaryGetDataQueryVariables
  >(GET_DATA)

  return (
    <Container>
      <Section gutter="sm">
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-headingDisplay uppercase text-4xl font-bold">
              Discover the internet&apos;s best merch
            </h1>
            <p className="text-gray-700">
              Unlock the power of promotional products with our comprehensive
              glossary of the promotional product industry.
            </p>
          </div>

          <Navigation
            termSlugs={data.allGlossaryEntries
              .map(e => e.slug)
              .filter(notEmpty)}
          />
          <motion.ul layout className="flex flex-col">
            {data.allGlossaryEntries.map(entry => (
              <IndustryTermCard entry={entry} key={entry.id} component="li" />
            ))}
          </motion.ul>
        </div>
      </Section>
    </Container>
  )
}

const GET_DATA = gql`
  ${IndustryTermCard.fragments.term}

  query PromotionalProductGlossaryGetDataQuery {
    allGlossaryEntries(
      first: 100
      orderBy: term_ASC
      filter: { entryType: { notIn: ["companies"] } }
    ) {
      id
      ...IndustryTermCardTermFragment
    }
  }
`

export default IndustryTermsIndexPage
