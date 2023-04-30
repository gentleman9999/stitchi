import { Section, SectionHeader } from '@components/common'
import { Button, Container } from '@components/ui'
import { ArrowDown } from 'icons'
import React from 'react'
import SectionHeading from './SectionHeader'

const tableOfContents = {
  Introduction: {
    'Why college merch is the perfect side hustle for college students': 4,
    'What you will learn in this guide': 5,
  },
  'Understanding the Custom Merch Business': {
    'How is custom merch made?': 7,
    'Why Custom Merch Is So Popular': 9,
    'Success Stories from Custom Merch Entrepreneurs': 10,
    'Custom Merch on Campus': 11,
  },
  'Identifying Your Niche and Target Audience': {
    "Finding Your Niche: Why It's Important": 12,
    'Choosing a Profitable Niche and Target Audience': 13,
    'Analyzing Competitors in Your Niche': 14,
    'Conducting Market Research for Your Custom Merch Business': 15,
    'Collaborations and partnerships': 16,
    'Adaptability and niche expansion': 17,
    'Case Study: Underground Printing': 18,
  },
  'Designing Your Custom Merch': {
    'How to Create High-Quality Designs': 21,
    'Design Tips for Your Target Audience': 22,
    'Outsourcing Design Work': 23,
    'Legal Considerations and Licensing': 25,
    'Design Software and Tools': 25,
    Conclusion: 27,
  },
  'Manufacturing & Delivering Custom Merch': {
    'Overview of the Manufacturing and Delivery Process': 28,
    'Choosing the Ideal Manufacturing Partner': 29,
    'Ensuring Seamless Delivery to Your Customers': 30,
    'Comparing the Pros and Cons of Various Printing Techniques': 30,
    'Managing and Rectifying Production Errors': 32,
  },
  'Marketing and Selling Your Custom Merch': {
    'Different Marketing Channels for Your Custom Merch': 34,
    'Building a Strong Online Presence': 35,
    'Optimizing Pricing Strategy': 36,
    'Building a Community Around Your Brand': 37,
    'Offline Marketing Opportunities': 38,
    'Analytics and Data-Driven Decision Making': 38,
    'Customer Service and Relationship Building': 39,
  },
  'Managing and Scaling Your Custom Merch Business': {
    'Time Management for Your Side Hustle': 41,
    'Tracking Your Expenses and Revenue': 42,
    'Legal and Tax Considerations': 43,
    'Supply Chain Management': 44,
    'Developing Key Partnerships': 45,
    'Scaling Your Custom Merch Business': 46,
    'Adopting Technologies for Business Efficiency': 47,
    'Diversifying Your Product Offerings': 48,
    Conclusion: 49,
  },
  Conclusion: {
    'Recap of the Guide': 51,
    'Final Words of Encouragement': 51,
    'Additional Resources for Your Custom Merch Business': 52,
  },
}

const TableOfContents = () => {
  const [showAll, setShowAll] = React.useState(false)
  return (
    <Container className="!max-w-3xl">
      <Section
        label="table-of-contents-title"
        className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
      >
        <SectionHeading number="1">Table of contents</SectionHeading>

        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-gray-900">
          Get a look at all of the content covered in the book. Everything you
          need to know is inside.
        </p>
        <p className="mt-4 text-lg tracking-tight text-gray-700">
          &quot;Cash in on Merch&quot; is comprised of 70 tightly edited, highly
          visual pages designed to teach you everything you need to know about
          starting a custom merch business with no unnecessary filler.
        </p>

        <ol role="list" className="mt-16 space-y-10 sm:space-y-16">
          {Object.entries(tableOfContents)
            .slice(0, showAll ? -1 : 2)
            .map(([title, pages]) => (
              <li key={title}>
                <h3 className="font-display text-3xl font-bold tracking-tight text-gray-900">
                  {title}
                </h3>
                <ol
                  role="list"
                  className="mt-8 divide-y divide-gray-300/30 rounded-2xl bg-gray-50 px-6 py-3 text-base tracking-tight sm:px-8 sm:py-7"
                >
                  {Object.entries(pages).map(([title, pageNumber]) => (
                    <li
                      key={title}
                      className="flex justify-between py-3"
                      aria-label={`${title} on page ${pageNumber}`}
                    >
                      <span
                        className="font-medium text-gray-900"
                        aria-hidden="true"
                      >
                        {title}
                      </span>
                      <span
                        className="font-mono text-gray-400"
                        aria-hidden="true"
                      >
                        {pageNumber}
                      </span>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
        </ol>
        {!showAll ? (
          <div className="flex justify-center mt-8">
            <Button
              variant="naked"
              onClick={() => setShowAll(true)}
              endIcon={<ArrowDown width={16} strokeWidth={3} />}
              className="!no-underline hover:!underline"
            >
              Show all
            </Button>
          </div>
        ) : null}
      </Section>
    </Container>
  )
}

export default TableOfContents
