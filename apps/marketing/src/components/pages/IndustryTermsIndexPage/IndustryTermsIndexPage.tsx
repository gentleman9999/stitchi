import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { IndustryTermsIndexPageEntryFragment } from '@generated/IndustryTermsIndexPageEntryFragment'
import React from 'react'
import { motion } from 'framer-motion'
import { IndustryTermCard, Section } from '@components/common'
import Navigation from './Navigation'
import { notEmpty } from '@utils/typescript'

interface Props {
  entries: IndustryTermsIndexPageEntryFragment[]
}

const IndustryTermsIndexPage = ({ entries }: Props) => {
  return (
    <Container>
      <Section gutter="sm">
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-heading text-4xl font-bold">
              Discover the internet&apos;s best merch
            </h1>
            <p className="text-gray-700">
              Unlock the power of promotional products with our comprehensive
              glossary of the promotional product industry.
            </p>
          </div>

          <Navigation termSlugs={entries.map(e => e.slug).filter(notEmpty)} />
          <motion.ul layout className="flex flex-col">
            {entries.map(entry => (
              <IndustryTermCard entry={entry} key={entry.id} component="li" />
            ))}
          </motion.ul>
        </div>
      </Section>
    </Container>
  )
}

IndustryTermsIndexPage.fragments = {
  entry: gql`
    ${IndustryTermCard.fragments.term}
    fragment IndustryTermsIndexPageEntryFragment on GlossaryEntryRecord {
      id
      ...IndustryTermCardTermFragment
    }
  `,
}

export default IndustryTermsIndexPage
