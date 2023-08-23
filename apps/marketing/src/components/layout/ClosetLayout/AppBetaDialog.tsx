import React from 'react'
import useFeatureFlags from '@components/hooks/useFeatureFlags'
import { Dialog } from '@components/ui'
import Script from 'next/script'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import routes from '@lib/routes'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'

const AppBetaDialog = () => {
  const [{ isBetaTester }, { loading: flagsLoading }] = useFeatureFlags()

  if (flagsLoading || isBetaTester) return null

  return (
    <Dialog open size="lg">
      <Dialog.Content>
        <h2 className="text-3xl font-semibold text-center">
          Welcome to Stitchi 👋
        </h2>
        <p className="mt-6 text-center text-xl font-light">
          We are dedicated to providing the best experience for our users. Our
          platform is currently at capacity, and we are onboarding new users in
          batches. Please fill out the form below to request access.
        </p>
        <p className="mt-6 text-center text-xl font-light">
          Thank you for your interest in our platform and we look forward to
          serving you soon! <span className="font-medium">- Everest</span>
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
      <Dialog.Actions className="flex justify-end">
        <Button
          Component="a"
          href={routes.internal.logout.href()}
          variant="naked"
          endIcon={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
        >
          Sign Out
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default AppBetaDialog
