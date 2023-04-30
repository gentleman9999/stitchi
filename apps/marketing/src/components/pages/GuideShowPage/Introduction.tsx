import { Section } from '@components/common'
import { Container } from '@components/ui'
import { Check } from 'icons'

const Introduction = () => {
  return (
    <Container className="text-lg tracking-tight text-gray-700 !max-w-4xl">
      <Section label="Introduction" className="pt-20 md:pt-36 lg:pt-32">
        <p className="font-display text-4xl font-bold tracking-tight text-gray-900">
          &quot;Cash in on Merch&quot; is a comprehensive book that teaches
          college students how to launch and grow a successful custom merch
          business.
        </p>
        <p className="mt-4">
          This easy-to-follow book breaks down the entire process, from
          understanding the basics of custom merch to identifying your niche,
          designing eye-catching products, manufacturing, marketing, and scaling
          your business.
        </p>
        <p className="mt-4">
          Forget about spending countless hours learning complex design software
          or investing a fortune in startup costs. &quot;Cash in on Merch&quot;
          reveals the secrets behind creating profitable and engaging custom
          merch, leveraging your campus network and the latest technology to
          make it accessible for anyone.
        </p>
        <p className="mt-4">
          Inside &quot;Cash in on Merch,&quot; you&apos;ll discover:
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {[
            'The perfect side hustle formula for busy college students',
            'Expert strategies for identifying profitable niches and target audiences',
            'Proven design tips and techniques for creating standout custom merch',
            'A step-by-step guide to manufacturing, delivery, and quality control',
            'Powerful marketing tactics for selling your products both online and offline',
            'Essential business management and scaling strategies to grow your custom merch empire',
          ].map(feature => (
            <li key={feature} className="flex">
              <Check className="h-6 w-6 stroke-primary" />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          By the end of this book, you&apos;ll have the tools, knowledge, and
          confidence to start your own custom merch business, achieve financial
          independence, and create a lasting impact on your college community.
          Don&apos;t miss out on the opportunity to turn your passion into
          profit with &quot;Cash in on Merch: The Student&apos;s Guide to
          Starting a Profitable Custom Merch Business with Just 4 Hours a
          Week.&quot;
        </p>
        {/* <p className="mt-10">
          <Link
            href="#free-chapters"
            className="text-base font-medium underline"
          >
            Get two free chapters straight to your inbox{' '}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </p> */}
      </Section>
    </Container>
  )
}

export default Introduction
