import { Section } from '@components/common'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import getOrThrow from '@lib/utils/get-or-throw'
import React from 'react'
import ContactMethod from './ContactMethod'
// import ExperienceSelector from './ExperienceSelector'
import NewOrderForm from './NewOrderForm'
import StartPageSeo from './StartPageSeo'
import { useIntercom } from 'react-use-intercom'

const supportEmail = getOrThrow(
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  'NEXT_PUBLIC_SUPPORT_EMAIL',
)

const StartPage = () => {
  const { showNewMessage } = useIntercom()

  const OtherContactOptions = (
    <address className="flex flex-col gap-10">
      <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-500 sm:mt-3 max-w-3xl">
        Need something else? Here are some other ways to get in touch.
      </p>
      <ContactMethod
        title="Work with us"
        label="See open positions"
        href={routes.external.careers.href()}
      />
      <ContactMethod
        title="Live Chat"
        label="Chat now"
        onClick={() => showNewMessage()}
      />
      <ContactMethod
        title="Email us"
        label={supportEmail}
        href={routes.external.support.email.href()}
      />
      <ContactMethod
        title="Text or call us"
        label="+1 (248) 221-1863"
        href={routes.external.support.phone.href()}
      />
      <ContactMethod
        title="Write us"
        label={
          <>
            30140 Orchard Lake Rd. <br />
            Farmington Hills, MI 48334
          </>
        }
      />
    </address>
  )

  return (
    <Container>
      <StartPageSeo />
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
                  to you.
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

export default StartPage
