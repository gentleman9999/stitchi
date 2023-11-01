import UserAvatar from '@components/common/UserAvatar'
import useUserOnboarding from '@components/hooks/useUserOnboarding'
import Dialog from '@components/ui/Dialog'
import Button from '@components/ui/ButtonV2/Button'
import { PaintBrushIcon } from '@heroicons/react/20/solid'
import {
  COMPANY_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PERSON_NAME,
  SUPPORT_PERSON_PICTURE,
} from '@lib/constants'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'

interface Props {}

const DesignOnboardingDialog = ({}: Props) => {
  const { onboarding, loading, update: updateOnboarding } = useUserOnboarding()
  const [showOnboarding, setShowOnboarding] = useQueryState(
    'onboarding',
    queryTypes.boolean.withDefault(false),
  )

  const hasSeenOnboarding =
    loading || onboarding?.seenDesignRequestDraftOnboarding

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
          <UserAvatar
            width="w-16"
            height="h-16"
            user={{
              name: SUPPORT_PERSON_NAME,
              picture: SUPPORT_PERSON_PICTURE,
            }}
          />
          <div className="prose prose-sm">
            <p>
              Hey there 👋 I&apos;m Everest, founder of {COMPANY_NAME} -
              Congratulations on selecting a product for your first design!
            </p>
            <p>
              Next, you&apos;ll have an opportunity to share your design ideas
              and upload any reference files. One of our expert designers will
              then bring your vision to life.
            </p>
            <p>
              Once your design is perfect, you&apos;ll be able to turn it into
              quality branded merchandise, fulfilled effortless wherever your
              audience is. But that&apos;s just the start...
            </p>
            <p>
              If you have any questions or want to provide feedback, click the
              support link in the navigation or drop me a line directly at{' '}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="underline"
                target="_blank"
              >
                {SUPPORT_EMAIL}
              </a>
              . We thank you for the opportunity to serve you - now enjoy for
              exploring!
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
