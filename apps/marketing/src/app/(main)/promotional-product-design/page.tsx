import { gql } from '@apollo/client'
import FeaturePageContainer from '@components/common/FeaturePageContainer'
import Container from '@components/ui/Container'
import DesignPageHero from './DesignPageHero'
import DesignPageProcess from './DesignPageProcess'
import DesignPageAdvantages from './DesignPageAdvantages'
import SectionFAQ from '@components/common/SectionFAQ'
import { Metadata } from 'next'
import routes from '@lib/routes'
import { getClient } from '@lib/apollo-rsc'
import {
  PromotionalProductsDesigngetDataQuery,
  PromotionalProductsDesigngetDataQueryVariables,
} from '@generated/types'

export const metadata: Metadata = {
  title: 'Free, professional merch and promotional product design',
  description:
    'If you need high quality custom clothing and promotional products, Stitchi is here to help. We offer free design solutions, fast quotes, excellent customer service, and speedy delivery times.',
  openGraph: { url: routes.internal.solutions.design.href() },
}

const PromotionalProductsDesign = async () => {
  const client = await getClient()
  const {
    data: { site },
  } = await client.query<
    PromotionalProductsDesigngetDataQuery,
    PromotionalProductsDesigngetDataQueryVariables
  >({ query: GET_DATA })

  return (
    <FeaturePageContainer catalog={site}>
      <Container>
        <DesignPageHero />
      </Container>

      <Container>
        <DesignPageProcess />
      </Container>

      <Container>
        <DesignPageAdvantages />
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
    </FeaturePageContainer>
  )
}

const GET_DATA = gql`
  ${FeaturePageContainer.fragments.catalog}

  query PromotionalProductsDesigngetDataQuery {
    site {
      ...FeaturePageContainerCatalogFragment
    }
  }
`

export default PromotionalProductsDesign
