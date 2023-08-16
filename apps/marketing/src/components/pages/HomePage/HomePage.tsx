import React from 'react'
import { Container } from '@components/ui'
import HomePageHero from './HomePageHero'
import HomePageSimpleFeatureSection from './HomePageSimpleFeatureSection'
import HomePageUseCasesSection from './HomePageUseCasesSection'
import HomePageTestimonial from './HomePageTestimonial'
import { Section, SectionHeader } from '@components/common'
import { Doodle3 } from 'icons'
import HomePageFeaturedPosts from './HomePageFeaturedPosts'
import { gql } from '@apollo/client'
import { HomePageFeaturedPostsFragment } from '@generated/HomePageFeaturedPostsFragment'
import ClosingCtaSection from '@components/common/ClosingCtaSection'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'
import HomePageFeaturedImages from './HomePageFeaturedImages'

export interface HomePageProps {
  featuredPosts: HomePageFeaturedPostsFragment[]
}

const HomePage = ({ featuredPosts }: HomePageProps) => {
  return (
    <>
      <Container>
        <HomePageHero />
      </Container>

      <Section>
        <CustomerLogoBanner />
      </Section>

      <HomePageFeaturedImages />

      <Container>
        <Section gutter="lg" className="lg:text-center">
          <SectionHeader
            pretitle="Merch that scales"
            title="All-in-one solution for merchandise design, production, and fulfillment."
          />

          <br />
          <br />
          <div className="flex justify-center">
            <Doodle3 height="15vh" strokeWidth={3} />
          </div>
        </Section>
      </Container>

      <Container>
        <HomePageSimpleFeatureSection />
      </Container>

      <Container>
        <HomePageTestimonial />
      </Container>

      <div className="bg-secondary">
        <HomePageUseCasesSection />
      </div>

      <Container>
        <HomePageFeaturedPosts posts={featuredPosts} />
      </Container>

      <Container>
        <ClosingCtaSection />
      </Container>
    </>
  )
}

HomePage.fragments = {
  featuredPosts: gql`
    ${HomePageFeaturedPosts.fragments.posts}
    fragment HomePageFeaturedPostsFragment on ArticleRecord {
      id
      ...HomePageFeaturedPostsPostsFragment
    }
  `,
}

export default HomePage
