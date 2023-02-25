import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Term {
  slug: string | null
  term: string | null
  entryType: string | null
}

interface Props {
  term: Term
}

const Breadcrumbs = ({ term }: Props) => {
  if (!term.slug || !term.entryType) {
    return null
  }

  return (
    <div className="flex gap-2 text-xl font-heading">
      <Link href={routes.internal.glossary.href()}>
        Promotional Products Directory
      </Link>
      <span>&gt;</span>
      <Link
        href={routes.internal.glossary.show.href({
          termSlug: term.slug,
          termType: term.entryType,
        })}
        className="font-semibold"
      >
        {term.term}
      </Link>
    </div>
  )
}

export default Breadcrumbs
