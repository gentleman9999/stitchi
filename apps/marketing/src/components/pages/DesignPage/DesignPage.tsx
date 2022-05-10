import { SectionFAQ } from '@components/common'
import { Container } from '@components/ui'
import React from 'react'
import DesignPageArtExamples from './DesignPageArtExamples'

import DesignPageHero from './DesignPageHero'
import DesignPageProcess from './DesignPageProcess'

interface DesignPageProps {}

const DesignPage = (props: DesignPageProps) => {
  return (
    <>
      <Container>
        <DesignPageHero />
      </Container>

      <Container>
        <DesignPageProcess />
      </Container>
      <Container>
        <DesignPageArtExamples />
      </Container>
      <Container>
        <SectionFAQ
          faqs={[
            {
              id: 'faq-1',
              question: 'What is the process?',
              answer:
                'The process is simple. You create a design and we will create a proof of concept for you. You can then share the link with your team and they can create their own design and proof of concept.',
            },
            {
              id: 'faq-1',
              question: 'What is the process?',
              answer:
                'The process is simple. You create a design and we will create a proof of concept for you. You can then share the link with your team and they can create their own design and proof of concept.',
            },
            {
              id: 'faq-1',
              question: 'What is the process?',
              answer:
                'The process is simple. You create a design and we will create a proof of concept for you. You can then share the link with your team and they can create their own design and proof of concept.',
            },
          ]}
        />
      </Container>
    </>
  )
}

export default DesignPage
