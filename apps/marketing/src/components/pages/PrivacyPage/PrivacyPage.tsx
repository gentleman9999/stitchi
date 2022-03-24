import { gql } from '@apollo/client'
import { CmsSeo, CmsStructuredText, Section } from '@components/common'
import { PrivacyPagePageFragment } from '@generated/PrivacyPagePageFragment'
import React from 'react'
import { Container } from '@components/ui'

export interface PrivacyPageProps {
  page: PrivacyPagePageFragment
}

const PrivacyPage = ({ page }: PrivacyPageProps) => {
  if (!page.content) {
    throw new Error('Page did not return any content')
  }

  return (
    <>
      <CmsSeo seo={page._seoMetaTags} />
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
    ${CmsSeo.fragments.seoTags}
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
