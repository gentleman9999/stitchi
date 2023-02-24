import { gql } from '@apollo/client'
import { Button, Container, LinkInline } from '@components/ui'
import { IndustryTermsIndexPageEntryFragment } from '@generated/IndustryTermsIndexPageEntryFragment'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from './Navigation'
import { notEmpty } from '@utils/typescript'
import routes from '@lib/routes'
import { isEmptyDocument } from 'datocms-structured-text-utils'
import { IndustryTermsIndexPageCategoryFragment } from '@generated/IndustryTermsIndexPageCategoryFragment'

interface Props {
  entries: IndustryTermsIndexPageEntryFragment[]
  categories: IndustryTermsIndexPageCategoryFragment[]
}

const IndustryTermsIndexPage = ({ entries, categories }: Props) => {
  return (
    <Container>
      <br />
      <br />
      <h1 className="font-heading text-4xl font-bold text-center">
        Discover the internet's best merch
      </h1>
      <br />
      <p className="text-gray-700  text-center">
        Unlock the power of promotional products with our comprehensive glossary
        of the promotional product industry.
      </p>
      <br />
      <br />
      <ul className="flex gap-4 flex-wrap">
        {categories.map(category => {
          return category.slug ? (
            <li key={category.id}>
              <Link
                className="py-2 px-4 rounded-full border"
                href={routes.internal.glossary.categories.show.href(
                  category.slug,
                )}
              >
                {category.title}
              </Link>
            </li>
          ) : null
        })}
      </ul>
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
  entryType,
}: IndustryTermsIndexPageEntryFragment) => {
  const hasDescription = !isEmptyDocument(description)

  const linkHref = hasDescription
    ? routes.internal.glossary.show.href({
        termSlug: `${slug}`,
        termType: `${entryType}`,
      })
    : `#${slug}`

  return (
    <section
      id={slug?.toString()}
      className="group p-6 hover:shadow-lg rounded-lg outline outline-gray-100 flex flex-col justify-between"
    >
      <div>
        <h2 className="font-semibold font-headingDisplay text-xl">
          <LinkInline
            href={linkHref}
            underline={hasDescription ? 'always' : 'never'}
          >
            {term}
          </LinkInline>
        </h2>

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
    fragment IndustryTermsIndexPageEntryFragment on GlossaryEntryRecord {
      id
      term
      definition

      description {
        value
      }
      slug
      entryType
    }
  `,
}

export default IndustryTermsIndexPage
