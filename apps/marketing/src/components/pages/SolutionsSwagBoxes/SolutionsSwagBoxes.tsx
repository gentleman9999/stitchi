import { Section, SectionFAQ, SectionHeader } from '@components/common'
import ClosingCtaSection from '@components/common/ClosingCtaSection'
import { Container } from '@components/ui'
import React from 'react'
import Hero from './Hero'

const SolutionsSwagBoxes = () => {
  return (
    <>
      <Container>
        <Hero />
      </Container>

      <Container>
        <Section gutter="lg">
          <SectionHeader title="Why choose Stitchi for your company swag boxes?" />
          <p className="max-w-2xl text-center m-auto text-lg mt-10">
            We specialize in creating personalized, full-service swag solutions
            that leave a lasting impression. Our custom swag boxes are designed
            to showcase your brand and make a memorable impact on your audience.
            Our high-quality products and exceptional customer service will
            elevate your brand to new heights.
          </p>
        </Section>
      </Container>
      <Container>
        <Section gutter="lg">
          <SectionHeader
            title="What's included in your custom swag-in-a-box?"
            pretitle="All-in-one"
            subtitle="Our swag bags & boxes service provides a complete branded
            experience."
          />
          <ul className="grid grid-cols-3 gap-6 mt-10">
            <li className="">
              <strong>Custom branded packaging/box</strong> <br />
              Make a bold statement with eye-catching, unique packaging that
              highlights your brand&apos;s identity.
            </li>
            <li className="">
              <strong>Multiple items in the box</strong> <br />
              Choose from a wide range of high-quality products, such as socks,
              t-shirts, notes, stickers, and more, all curated and fulfilled by
              us so you can focus on your business.
            </li>
            <li className="">
              <strong>Flexible customization options</strong> <br />
              Tailor every aspect of your swag box to your brand&apos;s specific
              needs, from colors and materials to the selection of items that
              resonate with your target audience.
            </li>
            <li className="">
              <strong>Efficient fulfillment and delivery</strong> <br />
              Trust our reliable and timely fulfillment process to ensure that
              your custom swag boxes arrive in excellent condition and within
              the expected timeframe.
            </li>
            <li className="">
              <strong>Scalability and flexibility</strong> <br />
              Whether you need swag boxes for a small event or a large
              promotional campaign, we can accommodate different order sizes,
              timelines, and budgets to meet your unique requirements.
            </li>
          </ul>
          <p className="text-center mt-10 text-lg text-gray-900 font-medium">
            Each box is carefully crafted to reflect your brand&apos;s values
            and deliver a captivating, one-of-a-kind experience.
          </p>
        </Section>
      </Container>
      <Container>
        <Section gutter="lg">
          <SectionHeader
            title="How our custom swag boxes boost your brand"
            subtitle="Investing in custom swag boxes offers numerous benefits."
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <li className="p-3 border rounded-md">
              <strong>Increased brand recognition</strong> <br />
              Unique and memorable swag boxes keep your brand top of mind,
              promoting awareness and recognition.
            </li>
            <li className="p-3 border rounded-md">
              <strong>Enhanced customer loyalty</strong>
              <br /> By providing high-quality products and a personalized
              experience, your customers will feel valued and appreciated,
              leading to stronger loyalty and long-term relationships.
            </li>
            <li className="p-3 border rounded-md">
              <strong>Improved employee engagement</strong>
              <br /> Custom company swag boxes serve as a tangible reminder of
              your company&apos;s commitment to excellence, boosting morale and
              employee pride.
            </li>
            <li className="p-3 border rounded-md">
              <strong>Amplified marketing impact</strong>
              <br /> By integrating swag boxes into your marketing strategy, you
              can effectively reach new audiences and generate buzz around your
              brand.
            </li>
          </ul>
        </Section>
      </Container>
      <Container>
        <ClosingCtaSection />
      </Container>
      <Container>
        <SectionFAQ
          faqs={[
            {
              id: 'faq-1',
              question:
                'What types of products can be included in a custom swag box?',
              answer:
                'A wide range of products can be included in a custom swag box, such as t-shirts, socks, hats, water bottles, notebooks, pens, stickers, tote bags, tech gadgets, and more. We work with you to curate items that align with your brand and target audience preferences.',
            },
            {
              id: 'faq-2',
              question:
                'How customizable is the packaging for the swag boxes? Can I include my company logo and branding elements?',
              answer:
                'The packaging for our swag boxes is highly customizable. You can include your company logo, branding elements, color schemes, and even unique packaging designs that cater to your specific needs and brand identity.',
            },
            {
              id: 'faq-3',
              question:
                'What is the minimum and maximum order quantity for swag boxes? Can you accommodate both small and large-scale projects?',
              answer:
                'We can accommodate a wide range of order quantities, from small-scale projects to large-scale campaigns. Our team will work with you to find a solution that fits your requirements and budget.',
            },
            {
              id: 'faq-4',
              question:
                'How does the ordering and design process work? Will I be able to review and approve the designs before production?',
              answer:
                "The ordering and design process begins with a consultation to understand your needs and objectives. Our design team will then create mockups and proposals for your swag boxes. You'll have the opportunity to review and approve the designs before we proceed with production.",
            },
            {
              id: 'faq-5',
              question:
                'How long does it take to produce and deliver the custom swag boxes?',
              answer:
                'Production and delivery times can vary based on factors like order quantity, customization complexity, and shipping location. Generally, you can expect a turnaround time of a few weeks from the design approval to final delivery.',
            },
            {
              id: 'faq-6',
              question:
                'What are the pricing options and payment terms for the swag-in-a-box service? Are there any hidden costs or additional fees?',
              answer:
                'Pricing for our swag-in-a-box service is based on the order quantity, the products included, and the level of customization. We provide transparent cost estimates and payment terms upfront, with no hidden fees or unexpected additional costs.',
            },
            {
              id: 'faq-7',
              question:
                'Can you accommodate special requests or unique products for the swag boxes?',
              answer:
                'Yes, we can accommodate special requests and source unique products for your swag boxes. Our team will work with you to ensure your swag box includes items that best represent your brand and resonate with your audience.',
            },
            {
              id: 'faq-8',
              question:
                'How do you ensure the quality of the products and packaging used in the swag boxes?',
              answer:
                'We carefully select and vet our suppliers, ensuring that they meet our strict quality standards. Our team monitors the entire production process, from design to fulfillment, to ensure the products and packaging in your swag boxes are of the highest quality.',
            },
            {
              id: 'faq-9',
              question:
                'Are there eco-friendly or sustainable options available for both the packaging and the products included in the swag boxes?',
              answer:
                'Yes, we offer eco-friendly and sustainable options for both packaging materials and the products included in the swag boxes. We can provide recyclable packaging, products made from sustainable materials, or items with eco-friendly certifications based on your preferences.',
            },
          ]}
        />
      </Container>
    </>
  )
}

export default SolutionsSwagBoxes
