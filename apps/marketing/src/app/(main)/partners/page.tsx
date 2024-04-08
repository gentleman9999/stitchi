import SectionFAQ from '@components/common/SectionFAQ'
import Hero from '@components/common/Hero'
import { COMPANY_NAME } from '@lib/constants'
import React from 'react'
import CTAButton from './CTAButton'
import Container from '@components/ui/Container'

export const metadata = {
  title: 'Partners',
  description: `Become a part of ${COMPANY_NAME}'s referral program and unlock the potential to earn significant commissions. Invite friends to explore our custom merchandise solutions and earn 10% on their orders for the first 12 months. Sign up now to start sharing and earning!`,
}

const Page = () => {
  return (
    <Container>
      <Hero
        title={'Earn serious commissions!'}
        subtitle={
          <>
            Do you know anyone who could benefit from our custom merchandise
            solutions? Do you need a reliable partner you can refer them to?
            Send them our way and you&apos;ll earn 10% on their orders for the
            first 12 months.
            <br />
            <br />
            <CTAButton />
          </>
        }
      />

      <main className="prose text-center m-auto mb-12">
        <section className="">
          <h2>Welcome to {COMPANY_NAME}&apos;s Family of Creatives!</h2>

          <p>
            At {COMPANY_NAME}, we believe in the power of community and
            creativity. Our mission is to transform unique ideas into tangible,
            high-quality merchandise, creating memories one design at a time.
            Now, we&apos;re inviting you to be a part of this journey through
            our &apos;s about building a creative community.
          </p>
        </section>

        <section>
          <h2>How it works</h2>
          <ol className="text-left">
            <li>
              <b>Sign Up</b>: Join our referral program and receive your unique
              referral link.
            </li>
            <li>
              <b>Share the Love</b>: Spread the word about {COMPANY_NAME}&apos;s
              innovative custom merchandise solutions.
            </li>
            <li>
              <b>Earn Rewards</b>: For every new customer that places an order
              through your link, earn a percentage of their first order&apos;s
              value.
            </li>
          </ol>
        </section>

        <section>
          <h2>Why choose {COMPANY_NAME}?</h2>

          <ul className="text-left">
            <li>
              <b>Quality and Craftsmanship</b>: We are committed to top-tier
              quality in every product.
            </li>
            <li>
              <b>Innovative Solutions</b>: From our state-of-the-art warehousing
              to diverse printing techniques.
            </li>
            <li>
              <b>Sustainable Practices</b>: We prioritize sustainable operations
              for a greener future.
            </li>
          </ul>
        </section>

        <section>
          <h2>Perks of Being a Referrer</h2>

          <ul className="text-left">
            <li>
              <b>Exclusive Discounts</b>: Get special discounts on future
              orders.
            </li>
            <li>
              <b>Insider Access</b>: Early access to new features and products.
            </li>
            <li>
              <b>Community Impact</b>: Play a crucial role in growing our
              creative community.
            </li>
          </ul>
        </section>

        <section className="border rounded-sm not-prose p-4 mt-20">
          <h2 className="text-2xl font-medium">Ready to Start?</h2>
          <p className="mt-2">
            Join {COMPANY_NAME}&apos;s referral program today and turn your
            network into a creative powerhouse. Let&apos;s craft success stories
            together!
          </p>
          <br />
          <CTAButton />
        </section>

        <div className="not-prose text-left">
          <SectionFAQ
            faqs={[
              {
                id: '1',
                question: 'Who can join the referral program?',
                answer:
                  'Anyone who loves Stitchi and wants to spread the word about our unique custom merchandise solutions!',
              },
              {
                id: '2',
                question: 'How are rewards calculated?',
                answer:
                  "You'll receive 10% of all orders made by each referred new customer for the first year.",
              },
              {
                id: '3',
                question: 'When do I receive my rewards?',
                answer:
                  'Rewards are credited to your account after the successful completion and payment of the referred order.',
              },
            ]}
          />
        </div>
      </main>
    </Container>
  )
}

export default Page
