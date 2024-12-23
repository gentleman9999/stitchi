import { gql } from '@apollo/client'
import {
  CmsStructuredText,
  CmsStructuredTextTableOfContents,
} from '@components/common'
import { IndustryTermsShowPageRelatedTermsFragment } from '@generated/IndustryTermsShowPageRelatedTermsFragment'
import { IndustryTermsShowPageTermFragment } from '@generated/IndustryTermsShowPageTermFragment'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import Breadcrumbs from './Breadcrumbs'
import RelatedTerms from './RelatedTerms'
import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'

interface Props {
  term: IndustryTermsShowPageTermFragment
  relatedTerms: IndustryTermsShowPageRelatedTermsFragment[]
}

const SidebarCard = ({
  children,
  title,
  disablePadding,
}: {
  children: React.ReactNode
  title?: string
  disablePadding?: boolean
}) => {
  return (
    <div
      className={cx('border p-4 rounded-xl prose overflow-hidden', {
        'p-0': disablePadding,
      })}
    >
      <span className="text-xl font-semibold">{title}</span>
      {children}
    </div>
  )
}

const IndustryTermsShowPage = ({ term, relatedTerms }: Props) => {
  const TableOfContents = term.description ? (
    <SidebarCard title="In this definition">
      <CmsStructuredTextTableOfContents content={term.description} />
    </SidebarCard>
  ) : null

  const Related = (
    <SidebarCard title="Related terms">
      <div className="prose-ul:list-none prose-ul:pl-0">
        <RelatedTerms
          terms={relatedTerms.map(term => ({
            title: term.term || '',
            href:
              term.slug && term.entryType
                ? routes.internal.glossary.show.href({
                    termSlug: term.slug,
                    termType: term.entryType,
                  })
                : routes.internal.glossary.href(),
          }))}
        />
      </div>
    </SidebarCard>
  )

  const termUrl = getTermUrl(term)
  const termDisplayUrl = getDisplayUrl(term)

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
            <div className="col-span-6 lg:col-span-4 flex flex-col gap-4">
              <h1 className="font-heading text-5xl font-bold">{term.term}</h1>
              {termUrl ? (
                <a
                  href={termUrl}
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="underline font-medium text-lg"
                >
                  <div className="flex items-center">
                    <ArrowRight strokeWidth={2} />
                    {termDisplayUrl}
                  </div>
                </a>
              ) : null}

              <hr />
              <div>
                <br />
                <div className="lg:hidden">
                  {TableOfContents}
                  <br />
                  <br />
                </div>

                {term.description ? (
                  <div className="prose prose-lg max-w-3xl">
                    <CmsStructuredText content={term.description} />
                  </div>
                ) : null}
                <div className="lg:hidden">
                  <br />
                  <br />
                  {Related}
                </div>
              </div>
            </div>
            <div className="hidden col-span-2 lg:flex flex-col gap-6">
              {TableOfContents}
              {Related}
            </div>
          </div>
        </div>
        <br />
        <div>
          <br />
          <div className="bg-primary rounded-sm px-4 py-8 flex flex-col gap-4 sm:flex-row justify-between sm:items-center">
            <p className="text-2xl font-heading font-medium">
              Become a promotional product terminology expert.
            </p>
            <div>
              <Link
                href={routes.internal.glossary.href()}
                passHref
                legacyBehavior
              >
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

const getTermUrl = (term: IndustryTermsShowPageTermFragment): string | null => {
  // Pick URL
  const url = term.affiliateUrl || term.businessUrl || null // Default to affiliate URL if it exists, otherwise use business URL

  if (!url) return null

  // Format URL with UTM params
  const utmParams = {
    utm_source: 'stitchi.co',
  }

  const urlObj = new URL(url)
  Object.entries(utmParams).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value)
  })

  return urlObj.toString()
}

const getDisplayUrl = (
  term: IndustryTermsShowPageTermFragment,
): string | null => {
  const url = term.businessUrl || term.affiliateUrl || null

  if (!url) return null

  return (
    url
      .replace('www.', '')
      // Remove protocol
      .replace(/(^\w+:|^)\/\//, '') // Default to business URL if it exists, otherwise use affiliate URL
      // Remove trailing slash
      .replace(/\/$/, '')
  )
}

IndustryTermsShowPage.fragments = {
  term: gql`
    ${CmsStructuredTextTableOfContents.fragments.glossaryTermDescription}
    ${CmsStructuredText.fragments.glossaryEntryDescription}
    fragment IndustryTermsShowPageTermFragment on GlossaryEntryRecord {
      id
      term
      slug
      entryType
      businessUrl
      affiliateUrl
      description {
        ...CmsStructuredTextGlossaryDescriptionFragment
        ...CmsStructuredTextTableOfContentsGlossaryTermDescriptionFragment
      }
    }
  `,
  relatedTerms: gql`
    fragment IndustryTermsShowPageRelatedTermsFragment on GlossaryEntryRecord {
      id
      term
      slug
      entryType
    }
  `,
}

export default IndustryTermsShowPage
