import Link from 'next/link'
import React from 'react'

interface Props {
  terms: {
    title: string
    href: string
  }[]
}

const RelatedTerms = ({ terms }: Props) => {
  return (
    <ul>
      {terms.map(term => (
        <li key={term.href}>
          <Link href={term.href}>{term.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default RelatedTerms
