import { SectionFAQ } from '@components/common'
import { Container } from '@components/ui'
import { NextSeo } from 'next-seo'
import React from 'react'
import DesignPageAdvantages from './DesignPageAdvantages'
import DesignPageArtExamples from './DesignPageArtExamples'

import DesignPageHero from './DesignPageHero'
import DesignPageProcess from './DesignPageProcess'
import DesignPageTestimonial from './DesignPageTestimonial'

interface DesignPageProps {}

const DesignPage = (props: DesignPageProps) => {
  return (
    <>
      <NextSeo
        title="Free, professional merch and promotional product design"
        description="If you need high quality custom clothing and promotional products, Stitchi is here to help. We offer free design services, fast quotes, excellent customer service, and speedy delivery times."
      />
      <Container>
        <DesignPageHero />
      </Container>

      <Container>
        <DesignPageProcess />
      </Container>
      {/* <Container>
        <DesignPageArtExamples />
      </Container> */}
      <Container>
        <DesignPageAdvantages />
      </Container>
      <Container>
        <DesignPageTestimonial />
      </Container>
      <Container>
        <SectionFAQ
          faqs={[
            {
              id: 'faq-1',
              question: 'What types of designs can be made?',
              answer:
                'Our art team can design anything you can imagine (okay, almost anything). We can design any style, including art deco, minimalist, psychedelic, 3-dimensional, and American Kitsch. We have the capabilities to adapt any style to complement and effectively communicate your brand.',
            },
            {
              id: 'faq-2',
              question: 'Are designs really free?',
              answer:
                'Yes. 100%. Anytime you purchase promotional products from Stitchi we include all design work for free, so you are always delighted with the final product. We always design every product as if it were our own: with innovative designs, attention to detail, and lots of love <3.',
            },
          ]}
        />
      </Container>
    </>
  )
}

export default DesignPage
