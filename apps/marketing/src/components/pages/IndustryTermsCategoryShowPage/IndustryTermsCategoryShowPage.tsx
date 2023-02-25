import { gql } from '@apollo/client'
import { IndustryTermCard } from '@components/common'
import { Container, LinkInline } from '@components/ui'
import { IndustryTermsCategoryShowPageCategoryFragment } from '@generated/IndustryTermsCategoryShowPageCategoryFragment'
import { IndustryTermsCategoryShowPageEntryFragment } from '@generated/IndustryTermsCategoryShowPageEntryFragment'
import routes from '@lib/routes'
import { ArrowLeft } from 'icons'
import React from 'react'

export interface Props {
  category: IndustryTermsCategoryShowPageCategoryFragment
  entries: IndustryTermsCategoryShowPageEntryFragment[]
}

const IndustryTermsCategoryShowPage = ({ category, entries }: Props) => {
  return (
    <>
      <Container>
        <h1 className="text-5xl font-medium text-gray-800 font-headingDisplay">
          {category.title}
        </h1>
        <br />
        <br />
        <div className="flex items-center">
          {category.slug ? (
            <>
              <LinkInline
                className="font-bold text-gray-500"
                underline="hover"
                href={routes.internal.glossary.href()}
              >
                <div className="flex items-center">
                  <ArrowLeft strokeWidth={2} height="16" /> Back to all
                  categories
                </div>
              </LinkInline>
            </>
          ) : null}
        </div>
        <br />

        <ul>
          {entries.map(entry => (
            <li key={entry.id}>
              <IndustryTermCard entry={entry} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

IndustryTermsCategoryShowPage.fragments = {
  category: gql`
    fragment IndustryTermsCategoryShowPageCategoryFragment on GlossaryCategoryRecord {
      id
      title
      slug
    }
  `,
  entry: gql`
    ${IndustryTermCard.fragments.term}
    fragment IndustryTermsCategoryShowPageEntryFragment on GlossaryEntryRecord {
      id
      ...IndustryTermCardTermFragment
    }
  `,
}

export default IndustryTermsCategoryShowPage
