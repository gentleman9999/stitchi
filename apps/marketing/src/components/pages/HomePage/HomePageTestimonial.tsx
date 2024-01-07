import React from 'react'
import {
  Section,
  SimpleCenteredTestimonial,
  useSpokesperson,
} from '@components/common'
import routes from '@lib/routes'

import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo.png'

const HomePageTestimonial = () => {
  const jenny = useSpokesperson('jenny_rothenberg')

  return (
    <Section gutter="lg">
      <div className="p-4 sm:p-8 rounded-sm">
        <SimpleCenteredTestimonial
          testimonial="We shipped over 8,000 pairs of Morning Brew joggers to our loyal readers, resulting in over 75,000 new subscribers. This was our largest growth campaign to date, and we love seeing pictures of our readers wearing their MB joggers on social media."
          company={{ name: 'Morning Brew', logo: morningBrewLogo }}
          spokesperson={jenny}
          cta={{
            text: 'See how we helped',
            href: routes.internal.customers.morningBrew.href(),
            className: 'text-[#006bd2]',
          }}
        />
      </div>
    </Section>
  )
}

export default HomePageTestimonial
