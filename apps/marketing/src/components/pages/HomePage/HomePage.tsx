import React from 'react'
import { Container } from '@components/ui'
import HomePageHero from './HomePageHero'
import HomePageSimpleFeatureSection from './HomePageSimpleFeatureSection'
import HomePageUseCasesSection from './HomePageUseCasesSection'
import HomePageTestimonial from './HomePageTestimonial'
import { Section, SectionHeader } from '@components/common'
import { Doodle3 } from 'icons'
import { gql } from '@apollo/client'
import { HomePageFeaturedPostsFragment } from '@generated/HomePageFeaturedPostsFragment'
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

      <div className="divide-y-2 divide-black">
        <Container>
          <Section gutter="lg">
            <SectionHeader
              pretitle="Merch that scales"
              title="All-in-one solution for merchandise design, production, and fulfillment."
            />

            <br />
            <br />
            <div className="flex justify-center mb-10">
              <Doodle3 height="15vh" strokeWidth={3} />
            </div>
            <HomePageSimpleFeatureSection />
          </Section>
        </Container>

        <HomePageTestimonial />

        <div className="">
          <HomePageUseCasesSection />
        </div>
      </div>
    </>
  )
}

HomePage.fragments = {
  featuredPosts: gql`
    fragment HomePageFeaturedPostsFragment on ArticleRecord {
      id
    }
  `,
}

export default HomePage
