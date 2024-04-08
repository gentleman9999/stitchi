import React from 'react'
import Container from '@components/ui/Container'
import Background from './Background'
import StatsSection from './StatsSection'
import TestimonialCard from './TestimonialCard'
import TweetsSection from './TweetsSection'
import Image from 'next/legacy/image'
import morningBrewLogoImage from '../../../../public/customers/morning_brew/morning_brew_logo.png'
import { Metadata } from 'next'
import routes from '@lib/routes'

export const metadata: Metadata = {
  title: "Powering Morning Brew's newsletter referral program with custom swag",
  description: `Morning Brew is a newsletter company that sends to more than 3
  million subscribers each day. We've overhauled their
  referral program to be completely automated and backed by a
  swag program.`,
  openGraph: { url: routes.internal.customers.morningBrew.href() },
}

const MorningBrewApparel = () => {
  return (
    <Container>
      <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start pb-24">
        <div className="md:order-2 relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          <div className="pt-12 sm:pt-16 lg:pt-20 prose">
            <h1>
              Powering Morning Brew&apos;s newsletter referral program with
              custom swag
            </h1>
            <Paragraph>
              Morning Brew, a daily business newsletter company, faced the
              challenge of managing and expanding their custom merchandise
              program to keep up with their rapidly growing audience. To
              overcome this challenge, Morning Brew partnered with Stitchi, the
              experts in high-quality custom merchandise, merch programs, and
              promotional products. Together, they not only enhanced the
              existing merch program but also implemented innovative solutions
              to streamline distribution and create a seamless experience for
              their readers.
            </Paragraph>
            <div className="lg:hidden">
              <div className="relative h-12 mt-8">
                <Image
                  {...morningBrewLogoImage}
                  layout="fill"
                  objectFit="contain"
                  alt="Morning Brew logo"
                />
              </div>
              <br />
              <StatsSection />
            </div>
            <div className="lg:h-0 lg:overflow-hidden">
              <br />
              <br />
              <TestimonialBlock />
            </div>
            <h2>Key Collaboration Elements</h2>

            <h3>Seamless Integration with Shopify</h3>
            <p>
              Stitchi integrated Morning Brew&apos;s existing merch program with
              Shopify, a leading e-commerce platform. This enabled a smooth and
              efficient transition, while also providing the foundation for the
              improved merch program. Through this integration, Stitchi was able
              to manage the inventory, order processing, and shipping of Morning
              Brew&apos;s merchandise, allowing the newsletter company to focus
              on their core business.
            </p>

            <h3>Dynamic Email Sequences</h3>
            <p>
              To facilitate the distribution of merchandise completely
              hands-free for Morning Brew, Stitchi developed dynamic email
              sequences that were triggered by specific actions or events. These
              emails included personalized offers, promotional codes, and
              reminders to readers. This automated approach helped drive
              engagement, increase conversions, and ultimately boost Morning
              Brew&apos;s brand awareness.
            </p>

            <h3>Ideation and Collaboration</h3>
            <p>
              Morning Brew and Stitchi worked closely together to develop
              creative and engaging ideas for the merchandise program. This
              collaborative approach ensured that the program was aligned with
              Morning Brew&apos;s brand identity, target audience, and marketing
              objectives. The partnership resulted in a range of unique and
              eye-catching promotional products that resonated with Morning
              Brew&apos;s readers.
            </p>

            <h3>Execution and Fulfillment</h3>
            <p>
              Stitchi took charge of the integration and fulfillment aspects of
              the partnership, leveraging their expertise in custom merchandise
              and merch programs. This included the production, warehousing, and
              shipping of Morning Brew&apos;s promotional products.
              Stitchi&apos;s efficient fulfillment process ensured that Morning
              Brew&apos;s readers received their merchandise promptly and in
              perfect condition.
            </p>

            <h2>Conclusion</h2>
            <Paragraph>
              The partnership between Morning Brew and Stitchi proved to be
              highly successful, as it not only enhanced the existing
              merchandise program but also streamlined the entire process. The
              seamless integration with Shopify, dynamic email sequences, and
              collaborative approach resulted in a highly effective merch
              program that increased engagement, conversions, and brand
              awareness for Morning Brew.
            </Paragraph>
          </div>
        </div>
        <div className="sm:py-16 lg:py-0 lg:mt-20">
          <div className="hidden lg:block">
            <TestimonialBlock />
          </div>
          <div className="hidden lg:block">
            <div className="relative h-12 mt-8">
              <Image
                {...morningBrewLogoImage}
                layout="fill"
                objectFit="contain"
                alt="Morning Brew logo"
              />
            </div>
            <br />
            <StatsSection />
          </div>

          <TweetsSection />
        </div>
      </div>
    </Container>
  )
}

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-base leading-7">{children}</p>
}

const TestimonialBlock = () => {
  return (
    <div className="relative sm:block">
      <div className="absolute">
        <Background />
      </div>

      <div className="relative mx-auto max-w-md px-0 sm:max-w-3xl lg:max-w-none">
        <TestimonialCard />
      </div>
    </div>
  )
}

export default MorningBrewApparel
