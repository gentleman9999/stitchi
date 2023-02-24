import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { IndustryTermsCategoryShowPageCategoryFragment } from '@generated/IndustryTermsCategoryShowPageCategoryFragment'
import { IndustryTermsCategoryShowPageEntryFragment } from '@generated/IndustryTermsCategoryShowPageEntryFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

export interface Props {
  category: IndustryTermsCategoryShowPageCategoryFragment
  entries: IndustryTermsCategoryShowPageEntryFragment[]
}

const IndustryTermsCategoryShowPage = ({ category, entries }: Props) => {
  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold text-gray-600 font-heading">
          {category.title}
        </h1>
        <ul>
          {entries.map(entry =>
            entry.slug && entry.entryType ? (
              <li key={entry.id}>
                <Link
                  href={routes.internal.glossary.show.href({
                    termSlug: entry.slug,
                    termType: entry.entryType,
                  })}
                >
                  {entry.term}
                </Link>
              </li>
            ) : null,
          )}
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
    }
  `,
  entry: gql`
    fragment IndustryTermsCategoryShowPageEntryFragment on GlossaryEntryRecord {
      id
      term
      slug
      entryType
    }
  `,
}

export default IndustryTermsCategoryShowPage
