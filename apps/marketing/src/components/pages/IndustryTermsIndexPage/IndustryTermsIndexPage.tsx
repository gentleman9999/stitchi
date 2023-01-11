import { gql } from '@apollo/client'
import { Button, Container, LinkInline } from '@components/ui'
import { IndustryTermsIndexPageEntryFragment } from '@generated/IndustryTermsIndexPageEntryFragment'
import { useRouter } from 'next/router'
import cx from 'classnames'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from './Navigation'
import { notEmpty } from '@utils/typescript'
import routes from '@lib/routes'
import { isEmptyDocument } from 'datocms-structured-text-utils'

interface Props {
  entries: IndustryTermsIndexPageEntryFragment[]
}

const IndustryTermsIndexPage = ({ entries }: Props) => {
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
  description,
}: IndustryTermsIndexPageEntryFragment) => {
  const { asPath } = useRouter()

  const hasDescription = !isEmptyDocument(description)

  const linkHref = hasDescription
    ? routes.internal.glossary.show.href(`${slug}`)
    : `#${slug}`

  return (
    <section
      id={slug?.toString()}
      className="group p-6 hover:shadow-lg rounded-lg outline outline-gray-100 flex flex-col justify-between"
    >
      <div>
        <LinkInline
          href={linkHref}
          underline={hasDescription ? 'always' : 'never'}
        >
          <h2 className="font-semibold font-headingDisplay text-xl">{term}</h2>
        </LinkInline>

        <br />
        <p className="text-gray-500 leading-loose">{definition}</p>
      </div>
      {hasDescription ? (
        <div>
          <br />
          <div className="opacity-0 transition-all flex justify-end group-hover:opacity-100">
            <Link href={linkHref} passHref legacyBehavior>
              <Button
                slim
                color="brandPrimary"
                className="ml-auto"
                Component="a"
              >
                Word detail
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}

IndustryTermsIndexPage.fragments = {
  entry: gql`
    fragment IndustryTermsIndexPageEntryFragment on GlossaryEntryRecord {
      id
      term
      definition

      description {
        value
      }
      slug
    }
  `,
}

export default IndustryTermsIndexPage
