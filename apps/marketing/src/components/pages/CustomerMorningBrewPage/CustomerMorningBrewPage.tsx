import React from 'react'
import { Container } from 'ui'
import Background from './Background'
import StatsSection from './StatsSection'
import TestimonialCard from './TestimonialCard'
import TweetsSection from './TweetsSection'

const CustomerMorningBrewPage = () => {
  return (
    <Container>
      <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="md:order-2 relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <h1 className="text-4xl text-gray-900 font-extrabold tracking-tight md:text-5xl">
              Powering a newsletter referral program with swag
            </h1>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                Morning Brew is a newsletter company that sends to more than 3
                million subscribers each day. We&apos;ve overhauled their
                referral program to be completely automated and backed by a swag
                program.
              </p>
            </div>
            <div className="mt-10 text-gray-500 space-y-6">
              <h2 className="text-xl leading-7 text-gray-800 font-bold tracking-tight sm:text-xl">
                Building brands with loyal fans
              </h2>
              <p className="text-base leading-7">
                Morning Brew, a news media company, creates succinct daily
                e-newsletters that provide its over 2.5 million subscribers with
                quick and conversational summaries of all things business. Their
                primary objective was to acquire new subscribers, but at the
                same time, they wanted to provide a unique customer experience
                to stand out. Morning Brew wanted to engage and interact with
                their fans in a memorable, fun way — a chance to win exclusive
                brand swag. And with their mainly millennial subscriber base,
                Morning Brew needed to keep in mind that this demographic
                required an interesting brand experience; according to research
                from Retail TouchPoints, 68% of millennials desire a combined
                online and offline (swag) brand experience.
              </p>
              <p className="text-base leading-7">
                Morning Brew began their search for the right partner, and chose
                to work with Stitchi to strategize and launch a uniquely
                on-brand and reproducible marketing referral campaign. Stitchi
                combined strategic product development while elevating Morning
                Brew&apos;s brand message. Prioritizing the delivery of
                top-notch customer experiences, Stitchi created a successful
                campaign.
              </p>
            </div>
            <div className="mt-10 text-gray-500 space-y-6">
              <h2 className="text-xl leading-7 text-gray-800 font-bold tracking-tight sm:text-xl">
                The result of a successful swag campaign
              </h2>
              <p className="text-base leading-7">
                In addition to the 70,000 new subscribers, Morning Brew&apos;s
                swag provides the best return on investment a company could
                have. The most effective marketing dollars spent are on a
                customer who will promote your business for you and boost
                revenue — one who promotes your business through word-of-mouth
                marketing and advocates for your brand. A positive, memorable
                customer experience is critical to the sustained growth for any
                business.
              </p>
              <p className="text-base leading-7">
                The 7,000 loyal customers who participated in the campaign and
                earned swag are now wearing their jogger sweatpants everywhere
                they go as casual advertising, and leisurewear continues to grow
                in popularity. This organically leads to thousands of more
                subscriptions and more revenue. And not only did Morning Brew
                get a chance to increase their subscriber base in the moment,
                but they were also able to create lasting customer loyalty with
                those who participated in the campaign. Loyal customers tend to
                associate favorable experiences with a brand, increasing their
                likelihood to make repeat purchases with that business.
              </p>
              <p className="text-base leading-7">
                Leveraging your existing audience to market for you has among
                the lowest CAC (customer acquisition cost) compared to other
                digital marketing, such as Facebook or Google ads. Moreover,
                direct-referral acquisition and frictionless, personalized
                customer experiences lead to increased audience retention.
                Stitchi&apos;s proprietary strategies, processes, relationships,
                and focus on end-customer experience help startups, brands, and
                content creators discover untapped growth and financial success
                from their audience.
              </p>
            </div>
          </div>
        </div>
        <div className="sm:py-16 lg:py-0">
          <Background />

          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            <TestimonialCard />
          </div>
          <StatsSection />
          <TweetsSection />
        </div>
      </div>
    </Container>
  )
}

export default CustomerMorningBrewPage
