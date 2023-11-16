import { gql } from '@apollo/client'
import { CmsStructuredText, Section } from '@components/common'
import { PrivacyPagePageFragment } from '@generated/PrivacyPagePageFragment'
import React from 'react'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import CmsSeo, { CmsSeoFragments } from '@components/common/CmsSeo'

export interface PrivacyPageProps {
  page: PrivacyPagePageFragment
}

const PrivacyPage = ({ page }: PrivacyPageProps) => {
  if (!page.content) {
    throw new Error('Page did not return any content')
  }

  return (
    <>
      <CmsSeo
        seo={page._seoMetaTags}
        canonicalUrl={makeAbsoluteUrl(routes.internal.legal.privacy.href())}
      />
      <Container>
        <Section gutter="lg" className="prose prose-lg prose-fuchsia m-auto">
          <CmsStructuredText content={page.content} />
        </Section>
      </Container>
    </>
  )
}

PrivacyPage.fragments = {
  page: gql`
    ${CmsSeoFragments.seoTags}
    ${CmsStructuredText.fragments.privacyPolicyContent}
    fragment PrivacyPagePageFragment on PrivacyPolicyPageRecord {
      id
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
      content {
        ...CmsStructuredTextPrivacyPolicyContentFragment
      }
    }
  `,
}

export default PrivacyPage
