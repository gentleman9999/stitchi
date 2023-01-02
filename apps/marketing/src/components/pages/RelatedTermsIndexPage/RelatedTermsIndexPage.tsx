import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { RelatedTermsIndexPageEntryFragment } from '@generated/RelatedTermsIndexPageEntryFragment'
import { useRouter } from 'next/router'
import cx from 'classnames'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from './Navigation'
import { notEmpty } from '@utils/typescript'

interface Props {
  entries: RelatedTermsIndexPageEntryFragment[]
}

const RelatedTermsIndexPage = ({ entries }: Props) => {
  return (
    <Container>
      <br />
      <br />
      <h1 className="font-heading text-4xl font-bold text-center">
        Promotional Product Industry Terms
      </h1>
      <br />
      <p className="text-gray-700  text-center">
        Unlock the power of promotional products with our comprehensive glossary
        of industry terminology.
      </p>
      <br />
      <br />
      <br />
      <Navigation termSlugs={entries.map(e => e.slug).filter(notEmpty)} />
      <br />

      <motion.div layout className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {entries.map(entry => {
          return <Entry {...entry} key={entry.id} />
        })}
      </motion.div>
      <br />
    </Container>
  )
}

const Entry = ({
  slug,
  definition,
  term,
}: RelatedTermsIndexPageEntryFragment) => {
  const { asPath } = useRouter()

  const activeTermSlug = asPath.split('#')[1]

  return (
    <section
      id={slug?.toString()}
      className={cx('p-6 hover:shadow-lg rounded-lg outline outline-gray-100', {
        'sm:col-span-2 shadow-lg': activeTermSlug === slug,
      })}
    >
      <Link href={`#${slug}`} passHref>
        <a>
          <h2 className="font-semibold font-headingDisplay text-xl">{term}</h2>
        </a>
      </Link>

      <br />
      <p className="text-gray-500 leading-loose">{definition}</p>
    </section>
  )
}

RelatedTermsIndexPage.fragments = {
  entry: gql`
    fragment RelatedTermsIndexPageEntryFragment on GlossaryEntryRecord {
      id
      term
      definition
      slug
    }
  `,
}

export default RelatedTermsIndexPage
