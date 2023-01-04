import { gql } from '@apollo/client'
import {
  CmsStructuredText,
  CmsStructuredTextTableOfContents,
} from '@components/common'
import { Button, Container } from '@components/ui'
import { RelatedTermsShowPageTermFragment } from '@generated/RelatedTermsShowPageTermFragment'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import Breadcrumbs from './Breadcrumbs'

interface Props {
  term: RelatedTermsShowPageTermFragment
}

const RelatedTermsShowPage = ({ term }: Props) => {
  const TableOfContents = (
    <div className="border p-4 rounded-xl prose">
      <span className="text-xl font-semibold">In this definition</span>
      {term.description ? (
        <CmsStructuredTextTableOfContents content={term.description} />
      ) : null}
    </div>
  )

  return (
    <Container>
      <div className="divide-y gap-4">
        <div>
          <Breadcrumbs term={term} />
        </div>
        <br />
        <div>
          <br />
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-6 lg:col-span-4">
              <h1 className="font-heading text-5xl font-bold">{term.term}</h1>
              <div>
                {term.description ? (
                  <>
                    <br />
                    <div className="lg:hidden">
                      {TableOfContents}
                      <br />
                      <br />
                    </div>
                    <div className="prose prose-lg max-w-3xl">
                      <CmsStructuredText content={term.description} />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="hidden col-span-2 lg:block ">{TableOfContents}</div>
          </div>
        </div>
        <br />
        <div>
          <br />
          <div className="bg-primary rounded-lg px-4 py-8 flex flex-col gap-4 sm:flex-row justify-between sm:items-center">
            <p className="text-2xl font-heading font-medium">
              Become a promotional product terminology expert.
            </p>
            <div>
              <Link href={routes.internal.glossary.href()} passHref>
                <Button
                  variant="naked"
                  Component="a"
                  endIcon={<ArrowRight />}
                  className="whitespace-nowrap"
                >
                  View glossary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

RelatedTermsShowPage.fragments = {
  term: gql`
    ${CmsStructuredTextTableOfContents.fragments.glossaryTermDescription}
    ${CmsStructuredText.fragments.glossaryEntryDescription}
    fragment RelatedTermsShowPageTermFragment on GlossaryEntryRecord {
      id
      term
      slug
      description {
        ...CmsStructuredTextGlossaryDescriptionFragment
        ...CmsStructuredTextTableOfContentsGlossaryTermDescriptionFragment
      }
    }
  `,
}

export default RelatedTermsShowPage
