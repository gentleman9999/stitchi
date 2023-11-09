'use client'

import useUserOnboarding from '@components/hooks/useUserOnboarding'
import Dialog from '@components/ui/Dialog'
import Button from '@components/ui/ButtonV2/Button'
import { PaintBrushIcon } from '@heroicons/react/20/solid'
import { SUPPORT_EMAIL } from '@lib/constants'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import Logo from '@components/ui/Logo'

interface Props {}

const DesignOnboardingDialog = ({}: Props) => {
  const { onboarding, update: updateOnboarding } = useUserOnboarding()
  const [showOnboarding, setShowOnboarding] = useQueryState(
    'onboarding',
    queryTypes.boolean.withDefault(false),
  )

  const hasSeenOnboarding = onboarding?.seenDesignRequestDraftOnboarding

  React.useEffect(() => {
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)

      updateOnboarding({
        seenDesignRequestDraftOnboarding: true,
      })
    }
  }, [hasSeenOnboarding, setShowOnboarding, updateOnboarding])

  const handleClose = () => {
    setShowOnboarding(null)
  }

  if (!showOnboarding) return null

  return (
    <Dialog
      mobileFullScreen
      open
      onClose={handleClose}
      onOpenAutoFocus={e => e.preventDefault()}
    >
      <Dialog.Title>
        <Dialog.Close />
      </Dialog.Title>
      <Dialog.Content>
        <div className="flex flex-col items-center gap-8">
          <Logo className="w-16 h-16" />

          <div className="prose prose-sm">
            <p>
              Your custom design is now in expert hands! Here&apos;s what
              happens next:
            </p>
            <ol>
              <li>
                <b>Design Proof</b>: Our designers are crafting a proof based on
                your ideas and files.
              </li>
              <li>
                <b>Review</b>: You&apos;ll get an email with the design
                proof—review and tell us what you think.
              </li>
              <li>
                <b>Final Touches</b>: After your approval, we&apos;ll produce
                and ship your quality branded merchandise.
              </li>
            </ol>

            <h3>Questions or Feedback?</h3>
            <p>
              <b>Chat Now</b>: Click the chat icon for live help at any stage.{' '}
              <br />
              <b>Email Us</b>: Send your thoughts to{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>hello@stitchi.co</a>.
            </p>

            <p>
              We&apos;re committed to delivering an exceptional merchandise
              experience from design to delivery!
            </p>
          </div>

          <Button
            size="xl"
            onClick={handleClose}
            variant="ghost"
            endIcon={<PaintBrushIcon className="w-4 h-4" />}
          >
            Start designing
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default DesignOnboardingDialog
