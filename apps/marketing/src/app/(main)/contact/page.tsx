import routes from '@lib/routes'
import { Metadata } from 'next'
import ContactMethod from './ContactMethod'
import Container from '@components/ui/Container'
import Section from '@components/common/Section'
import { SUPPORT_EMAIL } from '@lib/constants'
import NewOrderForm from './NewOrderForm'

export const metadata: Metadata = {
  title: 'Contact us to get started',
  description:
    'We work with organization of all shapes and sizes to produce high-quality merch designed to increase revenue, awareness, or loyalty.',
  openGraph: { url: routes.internal.contact.href() },
}

const Start = () => {
  const OtherContactOptions = (
    <div className="flex flex-col gap-10">
      <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-500 sm:mt-3 max-w-3xl">
        Need something else? Here are some other ways to get in touch.
      </p>
      <ContactMethod
        title="Work with us"
        label="See open positions"
        href={routes.external.careers.href()}
      />
      <ContactMethod
        title="Email us"
        label={SUPPORT_EMAIL}
        href={routes.external.support.email.href()}
      />
      <ContactMethod
        title="Text or call us"
        label="+1 (248) 221-1863"
        href={routes.external.support.phone.href()}
      />
    </div>
  )

  return (
    <Container>
      <Section className="flex flex-col items-center">
        <div className="grid grid-cols-6 gap-10 md:gap-20">
          <div className="col-span-6 md:col-span-2">
            <div className="flex flex-col gap-10">
              <div>
                <h1 className="mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-center md:text-left font-headingDisplay">
                  Get with the Stitch
                </h1>
                <br />
                <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-500 sm:mt-3 text-center md:text-left max-w-3xl">
                  Have a question? Fill out the form and our team will get back
                  to you within 24 hours.
                </p>
              </div>
              <div className="hidden md:block">{OtherContactOptions}</div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4">
            <div className="bg-gray-50 p-5 md:p-10 rounded-sm">
              <NewOrderForm />
            </div>
          </div>

          <div className="md:hidden col-span-6">{OtherContactOptions}</div>
        </div>
        <br />
        <br />
      </Section>
    </Container>
  )
}

export default Start
