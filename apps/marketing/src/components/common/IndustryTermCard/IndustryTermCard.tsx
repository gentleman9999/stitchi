import React from 'react'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { IndustryTermCardTermFragment } from '@generated/IndustryTermCardTermFragment'
import routes from '@lib/routes'
import CmsImage from '../CmsImage'

export interface Props {
  component?: React.ElementType
  entry: IndustryTermCardTermFragment
}

const IndustryTermCard = ({ entry, component: Component = 'div' }: Props) => {
  if (!entry.slug || !entry.entryType) {
    console.error('IndustryTermCard: missing slug or entryType', entry)

    return null
  }

  const href = routes.internal.glossary.show.href({
    termSlug: entry.slug,
    termType: entry.entryType,
  })
  return (
    <Component
      id={entry.slug?.toString()}
      key={entry.id}
      className="sm:border-2 sm:border-b-0 border-gray-800 grid grid-cols-12 sm:last-of-type:border-b-2 last-of-type:rounded-b-md first-of-type:rounded-t-md overflow-hidden"
    >
      <div className="py-8 sm:p-8 col-span-12 sm:col-span-9">
        <Link href={href}>
          <h2 className="text-3xl font-headingDisplay font-bold">
            {entry.term}
          </h2>
        </Link>
        <br />
        <p>{entry.definition}</p>
      </div>
    </Component>
  )
}

IndustryTermCard.fragments = {
  term: gql`
    fragment IndustryTermCardTermFragment on GlossaryEntryRecord {
      id
      slug
      entryType
      definition
      term
    }
  `,
}

export default IndustryTermCard
