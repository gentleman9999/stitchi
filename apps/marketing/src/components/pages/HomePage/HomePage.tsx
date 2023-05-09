import React from 'react'
import { Container } from '@components/ui'
import HomePageHero from './HomePageHero'
import HomePageSimpleFeatureSection from './HomePageSimpleFeatureSection'
import HomePageUseCasesSection from './HomePageUseCasesSection'
import HomePageCustomerLogos from './HomePageCustomerLogos'
import HomePageTestimonial from './HomePageTestimonial'
import { Section, SectionHeader } from '@components/common'
import { Doodle3 } from 'icons'
import HomePageFeaturedPosts from './HomePageFeaturedPosts'
import { gql } from '@apollo/client'
import { HomePageFeaturedPostsFragment } from '@generated/HomePageFeaturedPostsFragment'
import ClosingCtaSection from '@components/common/ClosingCtaSection'

export interface HomePageProps {
  featuredPosts: HomePageFeaturedPostsFragment[]
}

const HomePage = ({ featuredPosts }: HomePageProps) => {
  return (
    <>
      <Container>
        <HomePageHero />
      </Container>

      <HomePageCustomerLogos />

      <Container>
        <Section gutter="lg" className="lg:text-center">
          <SectionHeader
            pretitle="Merch that scales"
            title="All-in-one solution"
          />
          <br />
          <p className="text-2xl md:text-4xl font-heading text-center">
            We build custom merch programs to diversify revenue and increase
            affinity for your brand.
          </p>
          <br />
          <br />
          <p className="md:text-xl max-w-3xl text-center m-auto">
            Our team of designers, marketers, and engineers is equipped to
            handle your diverse needs, including promotional product ideation,
            production, and distribution. We provide you with peace of mind
            every step of the way.
          </p>
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
