import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { IndustryTermsIndexPageEntryFragment } from '@generated/IndustryTermsIndexPageEntryFragment'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import routes from '@lib/routes'
import { IndustryTermsIndexPageCategoryFragment } from '@generated/IndustryTermsIndexPageCategoryFragment'
import { IndustryTermCard, Section } from '@components/common'
import SearchBar from './SearchBar'

interface Props {
  entries: IndustryTermsIndexPageEntryFragment[]
  categories: IndustryTermsIndexPageCategoryFragment[]
}

const IndustryTermsIndexPage = ({ entries, categories }: Props) => {
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
          {/* <SearchBar onSubmit={() => {}} loading={false} /> */}
          <div>
            <ul className="flex gap-4 flex-wrap">
              {categories.map(category => {
                return category.slug ? (
                  <li key={category.id}>
                    <Link
                      href={routes.internal.glossary.categories.show.href(
                        category.slug,
                      )}
                    >
                      <div className="py-3 px-5 rounded-md border font-medium">
                        {category.title}
                      </div>
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </div>

          {/* <Navigation termSlugs={entries.map(e => e.slug).filter(notEmpty)} /> */}
          <motion.ul layout className="flex flex-col">
            {entries.map(entry => (
              <IndustryTermCard entry={entry} key={entry.id} />
            ))}
          </motion.ul>
        </div>
      </Section>
    </Container>
  )
}

IndustryTermsIndexPage.fragments = {
  category: gql`
    fragment IndustryTermsIndexPageCategoryFragment on GlossaryCategoryRecord {
      id
      title
      slug
    }
  `,
  entry: gql`
    ${IndustryTermCard.fragments.term}
    fragment IndustryTermsIndexPageEntryFragment on GlossaryEntryRecord {
      id
      ...IndustryTermCardTermFragment
    }
  `,
}

export default IndustryTermsIndexPage
