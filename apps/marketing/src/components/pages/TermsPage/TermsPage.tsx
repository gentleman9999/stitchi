import { gql } from '@apollo/client'
import { CmsSeo, CmsStructuredText, Section } from '@components/common'
import { TermsPagePageFragment } from '@generated/TermsPagePageFragment'
import React from 'react'
import { Container } from '@components/ui'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'

export interface TermsPageProps {
  page: TermsPagePageFragment
}

const TermsPage = ({ page }: TermsPageProps) => {
  if (!page.content) {
    throw new Error('Page did not return any content')
  }

  return (
    <>
      <CmsSeo
        seo={page._seoMetaTags}
        canonicalUrl={makeAbsoluteUrl(routes.internal.legal.terms.href())}
      />
      <Container>
        <Section gutter="lg" className="prose prose-lg prose-fuchsia m-auto">
          <CmsStructuredText content={page.content} />
        </Section>
      </Container>
    </>
  )
}

TermsPage.fragments = {
  page: gql`
    ${CmsSeo.fragments.seoTags}
    ${CmsStructuredText.fragments.termsOfUseContent}
    fragment TermsPagePageFragment on TermsOfUsePageRecord {
      id
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
      content {
        ...CmsStructuredTextTermsOfUseContentFragment
      }
    }
  `,
}

export default TermsPage
