import React from 'react'
import { Container } from 'ui'
import StatsSection from './StatsSection'
import TestimonialCard from './TestimonialCard'
import TweetsSection from './TweetsSection'

const CustomerMorningBrewPage = () => {
  return (
    <Container>
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            <TestimonialCard />
          </div>
          <StatsSection />
          <TweetsSection />
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
              Powering a newsletter referral program with swag
            </h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                Morning Brew is a newsletter company that sends to more than 3
                million subscribers each day. We&apos;ve overhauled their
                referral program to be completely automated and backed by a swag
                program.
              </p>
            </div>
            <div className="mt-10 text-gray-500 space-y-6">
              <h3 className="text-xl leading-7 text-gray-800 font-bold tracking-tight sm:text-xl">
                Building brands with loyal fans
              </h3>
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
              <h3 className="text-xl leading-7 text-gray-800 font-bold tracking-tight sm:text-xl">
                The result of a successful swag campaign
              </h3>
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
      </div>
    </Container>
  )
}

export default CustomerMorningBrewPage