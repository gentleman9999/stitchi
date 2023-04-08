'use client'

import { Container } from '@/components/ui'
import routes from '@/lib/routes'
import getOrThrow from '@/utils/get-or-throw'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const emailAddress = getOrThrow(
  process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  'NEXT_PUBLIC_CONTACT_EMAIL',
)

export default function Page() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <Container>
      <section className="py-20">
        <div className="prose m-auto">
          <h1>Welcome to the PromoPepper Family!</h1>
          <p>
            Congratulations, and a huge thank you for subscribing to PromoPepper
            - your go-to source for everything promotional products! As a proud
            member of our growing community, you can now look forward to
            receiving a fresh dose of industry insights, engaging content, and
            exclusive interviews, all wrapped up neatly in your inbox every
            Tuesday morning around 9AM.
          </p>
          <p>
            Here&apos;s a quick rundown of what you can expect from our weekly
            newsletter:
          </p>
          <ul>
            <li>
              🔗 <b>Curated Content from Around the Web</b>: We know that
              staying updated with the latest trends and news in the promotional
              products industry can be a bit overwhelming. That&apos;s why our
              team scours the internet to bring you the most relevant and
              interesting articles, so you don&apos;t have to. We&apos;re all
              about making your life easier!
            </li>
            <li>
              📘 <b>Deep Dive</b>: Each week, we&apos;ll explore a hot topic in
              the promo industry, providing you with valuable insights, market
              analysis, and actionable strategies. Our goal is to help you stay
              ahead of the curve and make informed decisions to grow your
              business.
            </li>
            <li>
              🎙️ <b>Exclusive Interviews</b>: Get up close and personal with
              industry insiders, successful entrepreneurs, and thought leaders
              in the promotional products world. We&apos;ll dive into their
              experiences, uncover their secrets to success, and share their
              perspectives on the future of our industry.
            </li>
          </ul>

          <p>
            We&apos;re thrilled to have you on board, and we can&apos;t wait to
            embark on this exciting journey together. Feel free to reach out to
            us anytime with your feedback, suggestions, or even just to say
            hello (
            <a href={`mailto:${emailAddress}`} rel="nofollow" target="_blank">
              {emailAddress}
            </a>
            ). After all, we&apos;re in this together, and we love hearing from
            our valued subscribers!
          </p>
          <p>
            Stay tuned for your first issue of PromoPepper, landing in your
            inbox next Tuesday at 9AM sharp. In the meantime, why not{' '}
            <Link href={routes.internal.home.href()}>explore our website</Link>{' '}
            and get to know us a little better?
          </p>
          <p>
            Welcome to the family, and here&apos;s to a fantastic journey ahead!
          </p>
          <b>
            <span>Warm Regards,</span>
            <br />
            <span>Jordan & Everest</span>
            <br />
            <br />
            <span>PromoPepper</span>
          </b>
        </div>
      </section>
    </Container>
  )
}
