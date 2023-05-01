import { SectionFAQ } from '@components/common'
import { LinkInline } from '@components/ui'
import routes from '@lib/routes'
import React from 'react'

const FrequentlyAskedQuestions = () => {
  return (
    <SectionFAQ
      faqs={[
        {
          id: 'faq-1',
          question:
            'What types of rewards can I offer my customers for their referrals?',
          answer: (
            <>
              From t-shirts and hats to backpacks and coffee mugs, we have a
              variety of high-quality options to choose from. And, with top
              brands like Yeti and Lululemon available, your rewards will
              perfectly align with your brand. We can even source a special item
              just for you if you don&apos;t see something you like in{' '}
              <LinkInline href={routes.internal.catalog.href()}>
                our catalog
              </LinkInline>
              .
            </>
          ),
        },
        {
          id: 'faq-2',
          question: 'Is my newsletter ready for a referral program?',
          answer: (
            <div className="prose max-w-none prose-ul:list-none prose-ul:p-0 prose-li:p-0">
              There are several factors to consider when determining if your
              newsletter is ready for or will be successful with a referral
              program. Here are a few things to take into account:
              <br />
              <ul>
                <li>
                  <strong>Engaged audience</strong>: If you have an engaged
                  audience who is interested in your content and regularly
                  interacts with your newsletter, they may be more likely to
                  refer their friends and colleagues.
                </li>
                <li>
                  <strong>Strong brand</strong>: A strong brand and reputation
                  can help attract new customers via word-of-mouth referrals.
                </li>
                <li>
                  <strong>Incentives</strong>: Consider what type of incentives
                  you can offer to encourage customers to refer their friends
                  and colleagues. These rewards should be attractive enough to
                  motivate them to take action.
                </li>
                <li>
                  <strong>Tracking & Reporting</strong>: It&apos;s important to
                  have a way to track and report on the success of your referral
                  program. This will help you measure the effectiveness of your
                  referral program and make adjustments as needed.
                </li>
                <li>
                  <strong>Communication and reminder</strong>: Communicate
                  clearly and frequently on the referral program and remind your
                  existing customers that they can earn rewards for referrals,
                  this will help to increase the chances of success.
                </li>
              </ul>
              <br />
              We can help you assess the readiness of your newsletter for a
              referral program by analyzing your audience engagement, brand
              strength, and current referral program (if you have one). We can
              also help you design and execute an effective referral program, as
              well as track and report on its success.
            </div>
          ),
        },
      ]}
    />
  )
}

export default FrequentlyAskedQuestions
