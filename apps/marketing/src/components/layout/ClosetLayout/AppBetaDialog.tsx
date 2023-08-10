import React from 'react'
import useFeatureFlags from '@components/hooks/useFeatureFlags'
import { Dialog } from '@components/ui'
import Script from 'next/script'

const AppBetaDialog = () => {
  const [{ isBetaTester }, { loading: flagsLoading }] = useFeatureFlags()

  if (flagsLoading || isBetaTester) return null

  return (
    <Dialog open size="lg">
      <Dialog.Content>
        <h2 className="text-3xl font-semibold text-center">
          We&apos;re happy you&apos;re here 👋
        </h2>
        <p className="mt-6 text-center text-xl font-light">
          At Stitchi, we prioritize the quality of our service above all. As
          we&apos;re in our launch phase, we&apos;re limiting the number of
          customers we onboard to ensure that every user benefits from an
          unparalleled experience, and to guarantee that we can scale
          effectively. Please fill out the form below to express your interest
          in being part of an exclusive group that gets to experience
          Stitchi&apos;s offerings firsthand. Your submission will be
          thoughtfully reviewed, and we&apos;ll reach out as we expand our
          capacity. Join us in this journey and help shape the future of custom
          merch.
        </p>
        <p className="mt-4 text-center text-xl">
          <span className="font-medium">- Everest</span>
        </p>
        <div
          className="mt-8"
          data-tf-widget="uFnzT21G"
          data-tf-opacity="100"
          data-tf-iframe-props="title=Request Access Form"
          data-tf-transitive-search-params
          data-tf-medium="snippet"
          style={{ width: '100%', height: '500px' }}
        />
        <Script
          src="//embed.typeform.com/next/embed.js"
          strategy="lazyOnload"
        />
      </Dialog.Content>
    </Dialog>
  )
}

export default AppBetaDialog
